"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
