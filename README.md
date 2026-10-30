This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Contact form email

The sitewide contact form sends enquiries through Resend from the server-side `/api/contact` route. Configure these environment variables in Vercel:

```bash
RESEND_API_KEY=re_your_api_key
CONTACT_FORM_TO_EMAIL=enquiries@example.com
CONTACT_FORM_FROM_EMAIL=Crystal Plumbing Website <enquiries@your-verified-domain.example>
```

`CONTACT_FORM_FROM_EMAIL` must use a domain verified in Resend with SPF and DKIM configured. The visitor's submitted email is set as the reply-to address. The handler accepts same-origin browser submissions on the deployed domain, validates every field, rate-limits repeated requests and uses Resend idempotency keys to avoid duplicate delivery.

## Google reviews

The homepage includes seven verified Google review fallbacks, so the carousel works without external configuration. To automatically refresh it from Google Places, enable the Places API (New) in Google Cloud and add these server-only environment variables in Vercel:

```bash
GOOGLE_PLACES_API_KEY=your_google_places_api_key
GOOGLE_PLACE_ID=your_google_place_id
```

The API key is read only on the server and is not exposed to browser JavaScript. Live Place Details data is cached and refreshed every six hours. If Google is unavailable or the configuration is missing, the verified fallback reviews remain visible.

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
