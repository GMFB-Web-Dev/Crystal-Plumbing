"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["— Plumbing", "/services/plumbing"],
  ["— Gas fitting", "/services/gas-fitting"],
  ["Projects", "/projects"],
  ["Contact", "/contact"],
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`mobile-nav${open ? " is-open" : ""}`}>
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <Image src="/images/menu-close.svg" width={18} height={18} alt="" />
        ) : (
          <><span /><span /></>
        )}
      </button>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <Link
              href={href}
              key={href}
              className={label.startsWith("—") ? "mobile-sub-link" : undefined}
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
