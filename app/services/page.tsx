import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "../components/PageHero";
import { processSteps, services } from "../site-data";

export const metadata: Metadata = {
  title: "Plumbing & Gas Services | Crystal Plumbing Auckland",
  description: "Explore certified plumbing and gas fitting services for Auckland homes and small businesses.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Crystal-clear services" title="Practical solutions, done properly." description="From everyday repairs to renovations, hot water and certified gas work, we make the whole process straightforward." image="/images/van.jpg" imageAlt="Crystal Plumbing service van in Auckland" />

      <section className="section route-services">
        <div className="section-heading compact-heading"><div><p className="eyebrow">Choose a service</p><h2>How can we help?</h2></div><p>Open a service to see the full scope of residential and commercial work we handle.</p></div>
        <div className="service-route-grid">
          {services.map((service, index) => (
            <article className="service-route-card" key={service.slug}>
              <div className="service-route-image"><Image src={service.image} fill sizes="(max-width: 800px) 100vw, 50vw" alt={service.imageAlt} /></div>
              <div className="service-route-content"><span>0{index + 1} · {service.eyebrow}</span><h2>{service.title}</h2><p>{service.description}</p><Link className="button primary" href={service.href}>View {service.title.toLowerCase()} services <b aria-hidden="true">→</b></Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section included-services">
        <div className="included-copy"><p className="eyebrow light">More of what we do</p><h2>One call covers more than you think.</h2><p>Not sure which category your job falls under? That’s fine—tell us what’s happening and we’ll point you in the right direction.</p></div>
        <div className="included-grid">{["Hot water systems", "Bathroom renovations", "Kitchen fit-outs", "Leaks & blocked drains", "Gas appliances", "Safety certificates"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div>
      </section>

      <section className="section process-section">
        <div className="section-heading compact-heading"><div><p className="eyebrow">Our process</p><h2>Clear from first call to final check.</h2></div><p>You’ll always know what happens next, what the work involves and what it costs.</p></div>
        <div className="process-grid">{processSteps.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
    </>
  );
}
