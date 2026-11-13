import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const loadModule = createRequire(import.meta.url);
const source = fs.readFileSync(new URL("../app/api/contact/route.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function createHandler({ env = {}, verify, verificationStatus = 200 } = {}) {
  const requests = [];
  const emails = [];
  const context = {
    exports: {},
    process: {
      env: {
        NODE_ENV: "production",
        TURNSTILE_SECRET: "test-secret",
        TURNSTILE_HOSTNAMES: "crystalplumbing.co.nz,www.crystalplumbing.co.nz",
        RESEND_API_KEY: "test-email-key",
        ...env,
      },
    },
    Headers,
    Response,
    URL,
    URLSearchParams,
    AbortSignal,
    console,
    require: (name) => name === "resend" ? {
      Resend: class {
        emails = {
          send: async (...args) => {
            emails.push(args);
            return { error: null };
          },
        };
      },
    } : loadModule(name),
    fetch: async (url, options) => {
      requests.push({ url, options });
      const result = verify ? await verify(options) : {
        success: true,
        action: "contact",
        hostname: "crystalplumbing.co.nz",
      };
      return new Response(JSON.stringify(result), { status: verificationStatus });
    },
  };
  vm.createContext(context);
  vm.runInContext(compiled, context);
  return { post: context.exports.POST, requests, emails };
}

function submission(overrides = {}, headers = {}) {
  return new Request("https://crystalplumbing.co.nz/api/contact", {
    method: "POST",
    headers: {
      origin: "https://crystalplumbing.co.nz",
      "content-type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      name: "Test Visitor",
      email: "visitor@example.com",
      service: "Plumbing",
      requestId: "12345678-1234-1234-1234-123456789abc",
      "cf-turnstile-response": "fresh-token",
      ...overrides,
    }),
  });
}

test("verified enquiries accept omitted, blank, and short optional messages", async (t) => {
  for (const message of [undefined, "", "   ", "Hi"]) {
    await t.test(`message ${JSON.stringify(message)}`, async () => {
      const handler = createHandler();
      const response = await handler.post(submission({ message }));
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { ok: true });
      assert.equal(handler.emails.length, 1);
      assert.equal(handler.emails[0][0].replyTo, "visitor@example.com");
    });
  }
});

test("Siteverify receives the token and server-only secret before email delivery", async () => {
  const handler = createHandler();
  await handler.post(submission({}, { "x-forwarded-for": "203.0.113.4, 203.0.113.5" }));
  assert.equal(handler.requests.length, 1);
  const { url, options } = handler.requests[0];
  assert.equal(url, "https://challenges.cloudflare.com/turnstile/v0/siteverify");
  assert.equal(options.method, "POST");
  assert.equal(options.cache, "no-store");
  assert.ok(options.signal instanceof AbortSignal);
  assert.equal(options.body.get("secret"), "test-secret");
  assert.equal(options.body.get("response"), "fresh-token");
  assert.equal(options.body.get("remoteip"), "203.0.113.4");
  assert.equal(handler.emails.length, 1);
});

test("unknown client IP is omitted from Siteverify", async () => {
  const handler = createHandler();
  await handler.post(submission());
  assert.equal(handler.requests[0].options.body.has("remoteip"), false);
});

test("missing and malformed tokens cannot reach Siteverify or email delivery", async (t) => {
  for (const token of [undefined, null, "", "   ", 123, {}, "x".repeat(2049)]) {
    await t.test(`token ${typeof token}, length ${token?.length}`, async () => {
      const handler = createHandler();
      assert.equal((await handler.post(submission({ "cf-turnstile-response": token }))).status, 403);
      assert.equal(handler.requests.length, 0);
      assert.equal(handler.emails.length, 0);
    });
  }
});

test("missing server configuration fails closed", async (t) => {
  for (const env of [{ TURNSTILE_SECRET: "" }, { TURNSTILE_HOSTNAMES: "" }]) {
    await t.test(Object.keys(env)[0], async () => {
      const handler = createHandler({ env });
      assert.equal((await handler.post(submission())).status, 403);
      assert.equal(handler.requests.length, 0);
      assert.equal(handler.emails.length, 0);
    });
  }
});

test("failed, malformed, wrong-action and wrong-hostname verifications prevent delivery", async (t) => {
  const cases = [
    { success: false, "error-codes": ["timeout-or-duplicate"] },
    { success: "true", action: "contact", hostname: "crystalplumbing.co.nz" },
    { success: true, action: "login", hostname: "crystalplumbing.co.nz" },
    { success: true, action: "contact", hostname: "attacker.example" },
    { success: true, action: "contact" },
    {},
    null,
  ];
  for (const result of cases) {
    await t.test(JSON.stringify(result), async () => {
      const handler = createHandler({ verify: async () => result });
      assert.equal((await handler.post(submission())).status, 403);
      assert.equal(handler.emails.length, 0);
    });
  }
});

test("Siteverify network and HTTP failures prevent delivery", async () => {
  for (const options of [
    { verify: async () => { throw new Error("Network unavailable"); } },
    { verificationStatus: 503 },
  ]) {
    const handler = createHandler(options);
    assert.equal((await handler.post(submission())).status, 403);
    assert.equal(handler.emails.length, 0);
  }
});

test("local hostnames are rejected in production and supported in development", async () => {
  for (const nodeEnv of ["production", "development"]) {
    const handler = createHandler({
      env: { NODE_ENV: nodeEnv, TURNSTILE_HOSTNAMES: "localhost,127.0.0.1" },
      verify: async () => ({ success: true, action: "contact", hostname: "localhost" }),
    });
    assert.equal((await handler.post(submission())).status, nodeEnv === "production" ? 403 : 200);
    assert.equal(handler.emails.length, nodeEnv === "production" ? 0 : 1);
  }
});

test("replay rejected by Siteverify cannot send a second email", async () => {
  let redeemed = false;
  const handler = createHandler({
    verify: async () => {
      if (redeemed) return { success: false, "error-codes": ["timeout-or-duplicate"] };
      redeemed = true;
      return { success: true, action: "contact", hostname: "crystalplumbing.co.nz" };
    },
  });
  assert.equal((await handler.post(submission())).status, 200);
  assert.equal((await handler.post(submission())).status, 403);
  assert.equal(handler.emails.length, 1);
});

test("origin and field validation remain enforced before verification", async () => {
  const handler = createHandler();
  assert.equal((await handler.post(submission({}, { origin: "https://attacker.example" }))).status, 403);
  assert.equal((await handler.post(submission({ email: "invalid" }))).status, 400);
  assert.equal((await handler.post(submission({ message: "x".repeat(4001) }))).status, 400);
  assert.equal(handler.requests.length, 0);
  assert.equal(handler.emails.length, 0);
});
