"use client";

import Image from "next/image";
import { useState } from "react";

const links = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
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
            <a
              href={href}
              key={href}
              onClick={(event) => {
                event.preventDefault();
                setOpen(false);
                document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", href);
              }}
            >
              {label}
            </a>
          ))}
          <a href="tel:0276976797" onClick={() => setOpen(false)}>Call 027 697 6797</a>
        </nav>
      )}
    </div>
  );
}
