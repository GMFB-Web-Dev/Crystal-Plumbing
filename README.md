This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Contact form email

The sitewide contact form sends enquiries through Resend from the server-side `/api/contact` route. Configure these environment variables in Vercel:

```bash
RESEND_API_KEY=re_your_api_key
CONTACT_FORM_TO_EMAIL=info@crystalplumbing.co.nz
CONTACT_FORM_FROM_EMAIL=Crystal Plumbing Website <enquiries@your-verified-domain.example>
```

`CONTACT_FORM_FROM_EMAIL` must use a domain verified in Resend with SPF and DKIM configured. `CONTACT_FORM_TO_EMAIL` defaults to `info@crystalplumbing.co.nz` when omitted. The visitor's submitted email is set as the reply-to address. The handler accepts same-origin browser submissions on the deployed domain, validates every field, rate-limits repeated requests and uses Resend idempotency keys to avoid duplicate delivery.

## Contact form Turnstile

The shared contact form uses the existing Cloudflare Turnstile widget `0x4AAAAAAF_WmtpkdcmpoUST`, with action `contact`. The server calls Siteverify before sending any enquiry and requires a successful result with that action and an explicitly allowed frontend hostname.

Configure these variables in the existing Vercel project's environment settings, then redeploy:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAF_WmtpkdcmpoUST
TURNSTILE_SECRET=<existing widget secret, stored only in the deployment secret store>
TURNSTILE_HOSTNAMES=crystalplumbing.co.nz,www.crystalplumbing.co.nz
```

The public site key defaults to the existing widget's key. `TURNSTILE_SECRET` is server-only and must never use a `NEXT_PUBLIC_` prefix. Retrieve and store the existing widget secret using Cloudflare's [guarded existing-widget flow](https://developers.cloudflare.com/turnstile/spin/prompt.md); do not put it in source control or chat.

Use only the frontend hostnames for that deployment in `TURNSTILE_HOSTNAMES`. For local development, set `TURNSTILE_HOSTNAMES=localhost,127.0.0.1` in an ignored `.env.local`, and ensure those hostnames are allowed by the widget. Preview deployments need their own explicit hostname allowlist. Production-mode servers reject local hostnames even if they are accidentally configured. Missing configuration, missing or invalid tokens, and Siteverify failures reject the submission. The browser refreshes the challenge after every submission attempt so retries receive a fresh token.

Before considering setup complete, exercise the actual configured backend with a fresh real widget token, confirm a successful submission, then confirm replay rejection after Cloudflare's token redemption has propagated. Mocked tests do not verify the deployed secret or domain configuration.

## Google reviews

The homepage requests the latest reviews from Google whenever a visitor loads the page. Enable the Places API used by Place Details in Google Cloud and add these server-only environment variables in Vercel:

```bash
GOOGLE_PLACES_API_KEY=your_google_places_api_key
GOOGLE_PLACE_ID=your_google_place_id
```

The API key is read only on the server and is not exposed to browser JavaScript. Each page request makes an uncached Place Details call with `reviews_sort=newest`. Testimonials are filtered to exact five-star reviews, sorted by Google review time and limited to five. There are no hardcoded review fallbacks; if Google is unavailable or configuration is missing, visitors are shown a direct link to the Google reviews page instead of stale testimonial content.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
