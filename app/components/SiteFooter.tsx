import Image from "next/image";
import Link from "next/link";
import { services } from "../site-data";

export default function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        <Link className="brand brand-light" href="/">
          <Image src="/images/crystal-mark.png" width={52} height={54} alt="" />
          <span className="brand-words"><strong>Crystal</strong><small>Plumbing &amp; Gas</small></span>
        </Link>
        <p>Clear plumbing and gas services<br />done right across Auckland.</p>
      </div>
      <div className="footer-col">
        <p>Navigate</p>
        <Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/projects">Projects</Link><Link href="/contact">Contact</Link>
      </div>
      <div className="footer-col">
        <p>Services</p>
        {services.map((service) => <Link href={service.href} key={service.slug}>{service.title}</Link>)}
        <a href="tel:0276976797">027 697 6797</a>
        <a href="mailto:info@crystalplumbing.co.nz">info@crystalplumbing.co.nz</a>
      </div>
      <div className="footer-bottom"><span>© 2026 Crystal Plumbing &amp; Gas Ltd</span><span>Certified · Clear · Reliable</span></div>
    </footer>
  );
}
