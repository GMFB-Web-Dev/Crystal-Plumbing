import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Contact Crystal Plumbing | Auckland Plumber & Gas Fitter",
  description: "Contact James at Crystal Plumbing for clear advice and a no-obligation plumbing or gas fitting quote in Auckland.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Talk to James" title="Let’s get your job sorted." description="Got a leak, planning a renovation or need certified gas work? Tell us what’s happening and we’ll come back with clear next steps." image="/images/james.jpg" imageAlt="James from Crystal Plumbing" />
      <section className="section contact-details">
        <div className="contact-details-copy"><p className="eyebrow">Direct contact</p><h2>Prefer to talk it through?</h2><p>Call or email James directly. If he’s on a job and can’t answer straight away, he’ll get back to you as soon as possible.</p></div>
        <div className="contact-methods"><a href="tel:0276976797"><span>Phone</span><strong>027 697 6797</strong><b>Call now →</b></a><a href="mailto:info@crystalplumbing.co.nz"><span>Email</span><strong>info@crystalplumbing.co.nz</strong><b>Send email →</b></a><div><span>Service area</span><strong>Auckland-wide</strong><p>South Auckland to the North Shore and everywhere in between.</p></div></div>
      </section>
      <section className="contact-assurance"><div><span>01</span><strong>Clear quotes</strong><p>Know the scope and price before work starts.</p></div><div><span>02</span><strong>Certified work</strong><p>Plumbing and gas fitting completed to NZ standards.</p></div><div><span>03</span><strong>Reliable timing</strong><p>Honest scheduling and communication throughout.</p></div></section>
      <section className="section contact-form-pointer"><p className="eyebrow">Send an enquiry</p><h2>The form is just below.</h2><p>Include photos or detailed plans by mentioning them in your message—James can request them when he replies.</p><Link className="text-link dark" href="#quote">Go to form <span aria-hidden="true">↓</span></Link></section>
    </>
  );
}
