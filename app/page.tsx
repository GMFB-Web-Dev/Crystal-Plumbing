import Image from "next/image";
import Link from "next/link";
import { services } from "./site-data";

const Arrow = () => <svg aria-hidden="true" viewBox="0 0 20 20" className="arrow-icon"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;

const proof = [
  ["Certified", "Plumber & gas fitter", "✓"],
  ["Straight-up", "Clear communication", "□"],
  ["On time", "Reliable service", "◷"],
  ["Auckland-wide", "Local residential work", "⌂"],
];

const faqs = [
  ["What services do you offer?", "We cover residential and light-commercial plumbing and gas fitting—from leak repairs and hot water systems to complete bathroom, kitchen and appliance fit-outs."],
  ["How do I get a quote?", "Use the quote form below or call James directly. We’ll respond with clear next steps and arrange a site visit when needed."],
  ["Are you certified?", "Yes. Work is carried out by a fully certified plumber and gas fitter in line with New Zealand safety standards."],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-copy">
          <p className="eyebrow light">Auckland plumbing &amp; gas</p>
          <h1>Clear advice.<br /><span>Quality work.</span><br />No surprises.</h1>
          <p className="hero-intro">Straight-up plumbing and gas services from a certified local tradesman. Done properly, communicated clearly and made easy from start to finish.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/contact">Get a free quote <Arrow /></Link>
            <Link className="button secondary" href="/services">Explore services <Arrow /></Link>
          </div>
        </div>
        <div className="hero-image-wrap">
          <Image src="/images/james.jpg" fill priority sizes="(max-width: 800px) 100vw, 48vw" alt="James from Crystal Plumbing beside the Crystal Plumbing van" className="hero-image" />
          <div className="hero-caption"><span>Meet James</span><strong>Your local certified plumber</strong></div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Why choose Crystal Plumbing">
        {proof.map(([title, sub, icon]) => <div className="proof-item" key={title}><span className="proof-character">{icon}</span><span><strong>{title}</strong><small>{sub}</small></span></div>)}
      </section>

      <section className="section services home-services">
        <div className="section-heading">
          <div><p className="eyebrow">What we do</p><h2>Two trades.<br />One clear standard.</h2></div>
          <div className="heading-side"><p>Choose the service you need for the full list of residential and commercial solutions.</p><Link className="text-link dark" href="/services">View all services <Arrow /></Link></div>
        </div>
        <div className="home-service-grid">
          {services.map((service, index) => (
            <Link className="home-service-card" href={service.href} key={service.slug}>
              <Image src={service.image} fill sizes="(max-width: 800px) 100vw, 50vw" alt={service.imageAlt} />
              <div className="home-service-overlay"><span>0{index + 1} · {service.eyebrow}</span><h3>{service.title}</h3><p>{service.short}</p><b>Explore service <Arrow /></b></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="about">
        <div className="about-images">
          <div className="about-main"><Image src="/images/van.jpg" fill sizes="(max-width: 800px) 100vw, 48vw" alt="Crystal Plumbing service van" /></div>
          <div className="about-detail"><Image src="/images/basin.jpg" fill sizes="220px" alt="Modern basin installed by Crystal Plumbing" /></div>
          <div className="since"><strong>2023</strong><span>Serving<br />Auckland</span></div>
        </div>
        <div className="about-copy">
          <p className="eyebrow light">The face behind the faucet</p>
          <h2>Good plumbing starts with a clear conversation.</h2>
          <p>Crystal Plumbing was built on one simple idea: plumbing should be easy and fuss-free. James gives Auckland homeowners straightforward communication, quality work and no surprises.</p>
          <blockquote>“No fancy talk—just clear plumbing and gas services done right.”</blockquote>
          <Link className="text-link" href="/contact">Talk to James <Arrow /></Link>
        </div>
      </section>

      <section className="section projects home-projects">
        <div className="section-heading">
          <div><p className="eyebrow">Recent work</p><h2>Finished with care.<br />Built to last.</h2></div>
          <div className="heading-side"><p>Bathroom, kitchen and hot-water work completed across Auckland homes.</p><Link className="text-link dark" href="/projects">View all projects <Arrow /></Link></div>
        </div>
        <div className="project-grid">
          <figure className="project project-tall"><Image src="/images/shower.jpg" fill sizes="(max-width: 720px) 100vw, 32vw" alt="Modern brass shower installation" /><figcaption><span>Bathroom fit-out</span><strong>Brass detail shower</strong></figcaption></figure>
          <figure className="project project-wide"><Image src="/images/kitchen.jpg" fill sizes="(max-width: 720px) 100vw, 54vw" alt="Bright modern kitchen plumbing fit-out" /><figcaption><span>Kitchen plumbing</span><strong>Full renovation fit-out</strong></figcaption></figure>
          <figure className="project"><Image src="/images/hot-water.jpg" fill sizes="(max-width: 720px) 100vw, 27vw" alt="Efficient hot water system" /><figcaption><span>Hot water</span><strong>Efficient system upgrade</strong></figcaption></figure>
          <figure className="project"><Image src="/images/bathroom.jpg" fill sizes="(max-width: 720px) 100vw, 27vw" alt="Finished contemporary bathroom" /><figcaption><span>Bathroom renovation</span><strong>Clean modern finish</strong></figcaption></figure>
        </div>
      </section>

      <section className="testimonial"><p className="eyebrow light">What our customers say</p><div className="stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“Professional, courteous and transparent about the entire process. The team went above and beyond.”</blockquote><p className="customer">Aaron <span>· Auckland</span></p></section>

      <section className="section faq-section">
        <div className="faq-intro"><p className="eyebrow">Straight answers</p><h2>Questions?<br />Let’s clear them up.</h2><p>Still need a hand? Call James and talk through your project directly.</p><a className="text-link dark" href="tel:0276976797">027 697 6797 <Arrow /></a></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>0{index + 1}</span>{question}<b>+</b></summary><p>{answer}</p></details>)}</div>
      </section>
    </>
  );
}
