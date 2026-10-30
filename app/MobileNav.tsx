"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { services } from "./site-data";

const links = [
  ["Projects", "/projects"],
  ["Contact", "/contact"],
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className={`mobile-nav${open ? " is-open" : ""}`}>
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
      {open && (
        <nav className="mobile-menu" id="mobile-menu" aria-label="Mobile navigation">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <div className="mobile-services-group">
            <div>
              <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
              <button
                type="button"
                aria-label={servicesOpen ? "Hide service pages" : "Show service pages"}
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((value) => !value)}
              >
                <span aria-hidden="true">⌄</span>
              </button>
            </div>
            {servicesOpen && (
              <div className="mobile-services-submenu">
                <Link href="/services" onClick={() => setOpen(false)}>All services</Link>
                {services.map((service) => <Link href={service.href} key={service.slug} onClick={() => setOpen(false)}>{service.title}</Link>)}
              </div>
            )}
          </div>
          {links.map(([label, href]) => (
            <Link
              href={href}
              key={href}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a href="tel:0276976797" onClick={() => setOpen(false)}>Call 027 697 6797</a>
        </nav>
      )}
    </div>
  );
}
