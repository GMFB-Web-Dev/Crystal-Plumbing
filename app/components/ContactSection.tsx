"use client";

import { FormEvent, useState } from "react";

export default function ContactSection() {
  const [status, setStatus] = useState("");

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const service = String(data.get("service") || "General enquiry");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Website enquiry: ${service}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\n${message}`);
    setStatus("Your email app is opening with your enquiry ready to send.");
    window.location.href = `mailto:info@crystalplumbing.co.nz?subject=${subject}&body=${body}`;
  }

  return (
    <section className="contact-form-section" id="quote">
      <div className="contact-form-intro">
        <p className="eyebrow light">Ready when you are</p>
        <h2>Tell us what<br />needs sorting.</h2>
        <p>Share a few details and we’ll come back with clear advice, honest timing and the right next step.</p>
        <div className="contact-direct">
          <a href="tel:0276976797"><span>Call James</span>027 697 6797</a>
          <a href="mailto:info@crystalplumbing.co.nz"><span>Email</span>info@crystalplumbing.co.nz</a>
        </div>
      </div>
      <form className="contact-form" onSubmit={submitForm}>
        <div className="form-row">
          <label>Name<input name="name" autoComplete="name" required placeholder="Your name" /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required placeholder="you@email.com" /></label>
        </div>
        <div className="form-row">
          <label>Phone<input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" /></label>
          <label>Service<select name="service" defaultValue=""><option value="" disabled>What can we help with?</option><option>Plumbing</option><option>Gas fitting</option><option>Hot water</option><option>Renovation or fit-out</option><option>General enquiry</option></select></label>
        </div>
        <label>Project details<textarea name="message" rows={5} required placeholder="Tell us a little about the job…" /></label>
        <div className="form-submit"><button className="button primary" type="submit">Prepare enquiry <span aria-hidden="true">→</span></button><small>No obligation. We’ll respond as soon as we can.</small></div>
        <p className="form-status" aria-live="polite">{status}</p>
      </form>
    </section>
  );
}
