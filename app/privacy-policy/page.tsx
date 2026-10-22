import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Crystal Plumbing & Gas collects, uses and protects personal information provided through this website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="legal-page">
      <div className="legal-page-inner">
        <p className="eyebrow">Your information</p>
        <h1>Privacy policy</h1>
        <p className="legal-updated">Last updated 22 October 2026</p>

        <h2>Information we collect</h2>
        <p>
          When you contact Crystal Plumbing &amp; Gas, we may collect your name,
          contact information, location, the details of your job and your
          interactions with us.
        </p>

        <h2>Why we collect it</h2>
        <p>
          We use this information to respond to enquiries, prepare quotes,
          provide our plumbing and gas-fitting services and improve our business.
          Providing this information is optional, but we may be unable to respond
          or provide a service without enough detail to understand your request.
        </p>

        <h2>How it is handled</h2>
        <p>
          Enquiry information is available to Crystal Plumbing &amp; Gas and to
          service providers that help us operate the business and deliver email,
          including Google, Microsoft and our website email provider. We only use
          the information for the purposes described above and take reasonable
          steps to keep it secure.
        </p>

        <h2>Your rights</h2>
        <p>
          You may ask for a copy of personal information we hold about you or ask
          us to correct it if you believe it is wrong. Email{" "}
          <a href="mailto:info@crystalplumbing.co.nz">info@crystalplumbing.co.nz</a>{" "}
          or call <a href="tel:0276976797">027 697 6797</a>.
        </p>
      </div>
    </section>
  );
}
