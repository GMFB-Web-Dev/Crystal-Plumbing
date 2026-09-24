import Image from "next/image";
import Link from "next/link";
import MobileNav from "../MobileNav";
import { services } from "../site-data";

const Phone = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="button-icon">
    <path d="M7.2 3.7 9.4 8 7.8 9.6c1.2 2.4 3.2 4.4 5.6 5.6l1.6-1.6 4.3 2.2-.6 3.4c-.2 1-1 1.8-2.1 1.8C9.1 21 3 14.9 3 7.4c0-1.1.8-1.9 1.8-2.1l2.4-.4Z" />
  </svg>
);

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Crystal Plumbing home">
        <Image src="/images/crystal-mark.png" width={52} height={54} alt="" loading="eager" />
        <span className="brand-words"><strong>Crystal</strong><small>Plumbing &amp; Gas</small></span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/">Home</Link>
        <div className="nav-dropdown">
          <Link href="/services">Services <span aria-hidden="true">⌄</span></Link>
          <div className="nav-dropdown-menu">
            <Link href="/services">All services</Link>
            {services.map((service) => <Link href={service.href} key={service.slug}>{service.title}</Link>)}
          </div>
        </div>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <a className="header-call" href="tel:0276976797"><Phone />Talk to James</a>
      <MobileNav />
    </header>
  );
}
