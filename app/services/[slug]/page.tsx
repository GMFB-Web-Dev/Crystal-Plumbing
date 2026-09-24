import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "../../components/PageHero";
import { processSteps, services } from "../../site-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return { title: `${service.title} Auckland | Crystal Plumbing`, description: service.description };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const isPlumbing = service.slug === "plumbing";

  return (
    <>
      <PageHero eyebrow={service.eyebrow} title={`${service.title} services`} description={service.description} image={service.image} imageAlt={service.imageAlt} />

      <section className="section service-detail-intro">
        <div><p className="eyebrow">Auckland-wide service</p><h2>{isPlumbing ? "Small fix or full renovation—we’ll get it sorted." : "Safe gas work, clearly explained and certified."}</h2></div>
        <div><p>{isPlumbing ? "We work across Auckland, from South Auckland to the North Shore and everywhere in between. Every job is planned carefully, kept tidy and completed with a focus on long-term reliability." : "Whether you’re installing a new appliance, upgrading hot water or checking an existing system, James brings the qualifications and care needed to complete the work safely."}</p><Link className="button primary" href="/contact">Request a quote <b aria-hidden="true">→</b></Link></div>
      </section>

      <section className="service-lists">
        <article><span>01</span><h2>Residential {service.title.toLowerCase()}</h2><p>Practical work for safer, more comfortable and better-functioning homes.</p><ul>{service.residential.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article><span>02</span><h2>Commercial {service.title.toLowerCase()}</h2><p>Efficient, compliant solutions designed to minimise disruption to your business.</p><ul>{service.commercial.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </section>

      <section className="service-feature">
        <div className="service-feature-image"><Image src={isPlumbing ? "/images/bathroom.jpg" : "/images/james.jpg"} fill sizes="(max-width: 800px) 100vw, 50vw" alt={isPlumbing ? "Completed bathroom plumbing project" : "James from Crystal Plumbing"} /></div>
        <div className="service-feature-copy"><p className="eyebrow light">Why Crystal</p><h2>Clear scope.<br />Quality finish.</h2><p>We explain the options, agree the work before starting and keep you updated until the final check. No hidden costs or confusing trade talk.</p><ul><li>Certified and compliant work</li><li>Upfront, easy-to-follow quotes</li><li>Respectful service in your home or business</li><li>One point of contact from start to finish</li></ul></div>
      </section>

      <section className="section process-section">
        <div className="section-heading compact-heading"><div><p className="eyebrow">What happens next</p><h2>A simple four-step process.</h2></div><p>From first contact to the booked start date, everything stays clear and manageable.</p></div>
        <div className="process-grid">{processSteps.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
    </>
  );
}
