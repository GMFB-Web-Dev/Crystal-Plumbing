import Image from "next/image";
import MobileNav from "./MobileNav";

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="arrow-icon">
    <path d="M4 10h11M11 5l5 5-5 5" />
  </svg>
);

const Phone = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="button-icon">
    <path d="M7.2 3.7 9.4 8 7.8 9.6c1.2 2.4 3.2 4.4 5.6 5.6l1.6-1.6 4.3 2.2-.6 3.4c-.2 1-1 1.8-2.1 1.8C9.1 21 3 14.9 3 7.4c0-1.1.8-1.9 1.8-2.1l2.4-.4Z" />
  </svg>
);

const icons = {
  droplet: (
    <svg aria-hidden="true" viewBox="0 0 48 48"><path d="M24 5S11 20 11 30a13 13 0 0 0 26 0C37 20 24 5 24 5Z"/><path d="M18 31c.6 4 3 6 7 7"/></svg>
  ),
  flame: (
    <svg aria-hidden="true" viewBox="0 0 48 48"><path d="M29 5c2 9-6 11-3 18 2-4 6-5 8-9 5 6 8 12 7 18-1 8-8 12-17 12S8 39 8 30c0-8 5-14 12-21-1 8 2 11 5 13-1-7 5-10 4-17Z"/></svg>
  ),
  heat: (
    <svg aria-hidden="true" viewBox="0 0 48 48"><rect x="12" y="5" width="24" height="38" rx="7"/><path d="M18 13h12M18 20h12M20 35h8M24 27v5"/></svg>
  ),
  badge: (
    <svg aria-hidden="true" viewBox="0 0 48 48"><path d="m24 4 5 4 7-1 2 7 6 4-3 6 3 7-6 4-2 7-7-2-5 4-5-4-7 2-2-7-6-4 3-7-3-6 6-4 2-7 7 1 5-4Z"/><path d="m17 24 5 5 10-11"/></svg>
  ),
  chat: (
    <svg aria-hidden="true" viewBox="0 0 48 48"><path d="M7 9h34v25H20L10 42v-8H7V9Z"/><path d="M15 18h18M15 25h12"/></svg>
  ),
  clock: (
    <svg aria-hidden="true" viewBox="0 0 48 48"><circle cx="24" cy="24" r="18"/><path d="M24 14v11l7 4"/></svg>
  ),
  home: (
    <svg aria-hidden="true" viewBox="0 0 48 48"><path d="m5 23 19-16 19 16M10 20v22h28V20M19 42V29h10v13"/></svg>
  ),
};

const services = [
  {
    title: "Plumbing",
    copy: "Repairs, renovations and new fit-outs—handled cleanly, carefully and built to last.",
    detail: "From leaks to full fit-outs",
    icon: icons.droplet,
  },
  {
    title: "Gas fitting",
    copy: "Certified gas work for cooktops, hot water and home upgrades, completed to NZ standards.",
    detail: "Safe, certified gas work",
    icon: icons.flame,
  },
  {
    title: "Hot water",
    copy: "Reliable repairs, replacements and efficient hot water solutions sized for your home.",
    detail: "Repairs & replacements",
    icon: icons.heat,
  },
];

const proof = [
  { title: "Certified", sub: "Plumber & gas fitter", icon: icons.badge },
  { title: "Straight-up", sub: "Clear communication", icon: icons.chat },
  { title: "On time", sub: "Reliable service", icon: icons.clock },
  { title: "Auckland-wide", sub: "Local residential work", icon: icons.home },
];

const faqs = [
  ["What services do you offer?", "We cover residential plumbing and gas fitting—from leak repairs and hot water systems to complete bathroom and kitchen fit-outs."],
  ["How do I get a quote?", "Call James or send an email with a few details about your project. We’ll come back to you promptly with clear next steps and a no-obligation quote."],
  ["Are you certified?", "Yes. Work is carried out by a fully certified plumber and gas fitter, in line with New Zealand plumbing and gas safety standards."],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Crystal Plumbing home">
          <Image src="/images/crystal-mark.png" width={52} height={54} alt="" priority />
          <span className="brand-words"><strong>Crystal</strong><small>Plumbing &amp; Gas</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-call" href="tel:0276976797"><Phone />Talk to James</a>
        <MobileNav />
      </header>

      <section className="hero" id="top">
        <div className="hero-glow" />
        <div className="hero-copy">
          <p className="eyebrow light">Auckland plumbing &amp; gas</p>
          <h1>Clear advice.<br /><span>Quality work.</span><br />No surprises.</h1>
          <p className="hero-intro">Straight-up plumbing and gas services from a certified local tradesman. Done properly, communicated clearly and made easy from start to finish.</p>
          <div className="hero-actions">
            <a className="button primary" href="mailto:info@crystalplumbing.co.nz?subject=Free%20quote%20request">Get a free quote <Arrow /></a>
            <a className="button secondary" href="#services">Our services <Arrow /></a>
          </div>
        </div>
        <div className="hero-image-wrap">
          <Image src="/images/james.jpg" fill priority sizes="(max-width: 800px) 100vw, 48vw" alt="James from Crystal Plumbing beside the Crystal Plumbing van" className="hero-image" />
          <div className="hero-caption"><span>Meet James</span><strong>Your local certified plumber</strong></div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Why choose Crystal Plumbing">
        {proof.map((item) => (
          <div className="proof-item" key={item.title}>
            <span className="proof-icon">{item.icon}</span>
            <span><strong>{item.title}</strong><small>{item.sub}</small></span>
          </div>
        ))}
      </section>

      <section className="section services" id="services">
        <div className="section-heading">
          <div><p className="eyebrow">What we do</p><h2>Plumbing made<br />crystal clear.</h2></div>
          <p>Practical advice, tidy workmanship and the right solution for your home—without the jargon or run-around.</p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.title} style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}>
              <div className="service-top"><span className="service-number">0{index + 1}</span><span className="service-icon">{service.icon}</span></div>
              <p>{service.detail}</p>
              <h3>{service.title}</h3>
              <p className="service-copy">{service.copy}</p>
              <a href="mailto:info@crystalplumbing.co.nz?subject=Service%20enquiry">Enquire now <Arrow /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-images">
          <div className="about-main"><Image src="/images/van.jpg" fill sizes="(max-width: 800px) 100vw, 48vw" alt="Crystal Plumbing service van" /></div>
          <div className="about-detail"><Image src="/images/basin.jpg" fill sizes="220px" alt="A modern basin installed by Crystal Plumbing" /></div>
          <div className="since"><strong>2023</strong><span>Serving<br />Auckland</span></div>
        </div>
        <div className="about-copy">
          <p className="eyebrow light">The face behind the faucet</p>
          <h2>Good plumbing starts with a clear conversation.</h2>
          <p>Crystal Plumbing was built on one simple idea: plumbing should be easy and fuss-free. After years as a certified plumber and gas fitter, James knew Auckland homeowners wanted straightforward communication, quality work and no surprises.</p>
          <blockquote>“No fancy talk—just clear plumbing and gas services done right.”</blockquote>
          <a className="text-link" href="tel:0276976797">Talk to James <Arrow /></a>
        </div>
      </section>

      <section className="section projects" id="projects">
        <div className="section-heading projects-heading">
          <div><p className="eyebrow">Recent work</p><h2>Finished with care.<br />Built to last.</h2></div>
          <p>A look at recent bathroom, kitchen and hot water work completed across Auckland homes.</p>
        </div>
        <div className="project-grid">
          <figure className="project project-tall"><Image src="/images/shower.jpg" fill sizes="(max-width: 720px) 100vw, 32vw" alt="Modern brass shower installation" /><figcaption><span>Bathroom fit-out</span><strong>Brass detail shower</strong></figcaption></figure>
          <figure className="project project-wide"><Image src="/images/kitchen.jpg" fill sizes="(max-width: 720px) 100vw, 54vw" alt="Bright modern kitchen plumbing fit-out" /><figcaption><span>Kitchen plumbing</span><strong>Full renovation fit-out</strong></figcaption></figure>
          <figure className="project"><Image src="/images/hot-water.jpg" fill sizes="(max-width: 720px) 100vw, 27vw" alt="Efficient hot water cylinder installation" /><figcaption><span>Hot water</span><strong>Efficient system upgrade</strong></figcaption></figure>
          <figure className="project"><Image src="/images/bathroom.jpg" fill sizes="(max-width: 720px) 100vw, 27vw" alt="Finished contemporary bathroom" /><figcaption><span>Bathroom renovation</span><strong>Clean modern finish</strong></figcaption></figure>
        </div>
      </section>

      <section className="testimonial">
        <p className="eyebrow light">What our customers say</p>
        <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
        <blockquote>“Professional, courteous and transparent about the entire process. The team went above and beyond to fix my leaky pipes and clogged drains.”</blockquote>
        <p className="customer">Aaron <span>· Auckland</span></p>
      </section>

      <section className="section faq-section">
        <div className="faq-intro"><p className="eyebrow">Straight answers</p><h2>Questions?<br />Let’s clear them up.</h2><p>Still need a hand? Call James and talk through your project directly.</p><a className="text-link dark" href="tel:0276976797">027 697 6797 <Arrow /></a></div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>0{index + 1}</span>{question}<b>+</b></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div><p className="eyebrow light">Ready when you are</p><h2>Let’s get your job<br />sorted.</h2></div>
        <div className="contact-copy"><p>Tell us what you need and we’ll come back with clear advice, honest timing and a no-obligation quote.</p><div className="contact-actions"><a className="button primary" href="mailto:info@crystalplumbing.co.nz?subject=Free%20quote%20request">Get a free quote <Arrow /></a><a className="button secondary" href="tel:0276976797"><Phone /> 027 697 6797</a></div></div>
      </section>

      <footer>
        <div className="footer-brand"><a className="brand brand-light" href="#top"><Image src="/images/crystal-mark.png" width={52} height={54} alt="" /><span className="brand-words"><strong>Crystal</strong><small>Plumbing &amp; Gas</small></span></a><p>Clear plumbing and gas services<br />done right across Auckland.</p></div>
        <div className="footer-col"><p>Navigate</p><a href="#about">About</a><a href="#services">Services</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div>
        <div className="footer-col"><p>Get in touch</p><a href="tel:0276976797">027 697 6797</a><a href="mailto:info@crystalplumbing.co.nz">info@crystalplumbing.co.nz</a><a href="https://www.instagram.com/crystalplumbingnz/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/61562891267608/" target="_blank" rel="noreferrer">Facebook</a></div>
        <div className="footer-bottom"><span>© 2026 Crystal Plumbing &amp; Gas Ltd</span><span>Certified · Clear · Reliable</span></div>
      </footer>
    </main>
  );
}
