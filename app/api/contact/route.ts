import { Resend } from "resend";

export const runtime = "nodejs";

const productionOrigin = "https://crystal-plumbing.vercel.app";
const developmentOrigins = new Set([
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
]);
const services = new Set([
  "Plumbing",
  "Gas fitting",
  "Hot water",
  "Renovation or fit-out",
  "General enquiry",
]);

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  company?: string;
};

function isAllowedOrigin(origin: string | null) {
  if (!origin) return false;
  if (origin === productionOrigin) return true;
  return process.env.NODE_ENV !== "production" && developmentOrigins.has(origin);
}

function response(request: Request, body: object, status = 200) {
  const origin = request.headers.get("origin");
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": "application/json",
    Vary: "Origin",
  });

  if (isAllowedOrigin(origin)) {
    headers.set("Access-Control-Allow-Origin", origin!);
  }

  return new Response(JSON.stringify(body), { status, headers });
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  if (!cleaned || cleaned.length > maxLength) return null;
  return cleaned;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function validatePayload(value: unknown): ContactPayload | null {
  if (!value || typeof value !== "object") return null;
  const payload = value as Record<string, unknown>;
  const name = cleanText(payload.name, 100);
  const email = cleanText(payload.email, 254);
  const phone = typeof payload.phone === "string" ? payload.phone.trim().slice(0, 40) : "";
  const service = cleanText(payload.service, 50);
  const message = cleanText(payload.message, 4000);
  const company = typeof payload.company === "string" ? payload.company.trim() : "";

  if (!name || !email || !service || !message || !services.has(service)) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  return { name, email, phone, service, message, company };
}

function buildEmailHtml(payload: ContactPayload) {
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const phone = escapeHtml(payload.phone || "Not provided");
  const service = escapeHtml(payload.service);
  const message = escapeHtml(payload.message).replace(/\n/g, "<br />");

  return `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>New Crystal Plumbing website enquiry</title>
  </head>
  <body style="margin:0;background:#f4f6f8;color:#0b1b31;font-family:Arial,sans-serif;">
    <main lang="en" dir="ltr" style="max-width:620px;margin:0 auto;padding:32px 20px;">
      <section style="background:#ffffff;border-radius:16px;padding:32px;border-top:6px solid #de572e;">
        <p style="margin:0 0 10px;color:#de572e;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Website enquiry</p>
        <h1 style="margin:0 0 28px;font-size:28px;line-height:1.2;">New ${service} enquiry</h1>
        <p style="margin:0 0 8px;"><strong>Name:</strong> ${name}</p>
        <p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#265a97;">${email}</a></p>
        <p style="margin:0 0 8px;"><strong>Phone:</strong> ${phone}</p>
        <p style="margin:0 0 24px;"><strong>Service:</strong> ${service}</p>
        <h2 style="margin:0 0 10px;font-size:18px;">Project details</h2>
        <p style="margin:0;line-height:1.65;">${message}</p>
      </section>
    </main>
  </body>
</html>`;
}

function buildEmailText(payload: ContactPayload) {
  return [
    `New ${payload.service} website enquiry`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `Service: ${payload.service}`,
    "",
    "Project details:",
    payload.message,
  ].join("\n");
}

export function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    return response(request, { error: "Origin not allowed." }, 403);
  }

  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Origin": origin!,
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    },
  });
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request.headers.get("origin"))) {
    return response(request, { error: "Origin not allowed." }, 403);
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 20_000) {
    return response(request, { error: "Request is too large." }, 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return response(request, { error: "Invalid request." }, 400);
  }

  const payload = validatePayload(body);
  if (!payload) {
    return response(request, { error: "Please check the form and try again." }, 400);
  }

  // Silently accept bot submissions so the honeypot does not reveal itself.
  if (payload.company) {
    return response(request, { ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_FORM_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form email environment variables are not configured.");
    return response(request, { error: "Email delivery is temporarily unavailable." }, 503);
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from:
        process.env.CONTACT_FORM_FROM_EMAIL ||
        "Crystal Plumbing Website <crystal-plumbing@weblaunch.co.nz>",
      to: [to],
      replyTo: payload.email,
      subject: `Website enquiry: ${payload.service}`,
      html: buildEmailHtml(payload),
      text: buildEmailText(payload),
    });

    if (error) {
      console.error("Resend rejected a contact form email:", error.name);
      return response(request, { error: "We could not send your enquiry. Please call James instead." }, 502);
    }
  } catch (error) {
    console.error("Contact form email delivery failed:", error instanceof Error ? error.name : "Unknown error");
    return response(request, { error: "We could not send your enquiry. Please call James instead." }, 502);
  }

  return response(request, { ok: true });
}
