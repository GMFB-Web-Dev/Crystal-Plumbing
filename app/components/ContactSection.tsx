"use client";

import { FormEvent, useState } from "react";

export default function ContactSection() {
  const [status, setStatus] = useState<{ message: string; type: "idle" | "success" | "error" }>({
    message: "",
    type: "idle",
  });
  const [isSending, setIsSending] = useState(false);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setIsSending(true);
    setStatus({ message: "", type: "idle" });

    try {
      const request = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await request.json()) as { error?: string; ok?: boolean };

      if (!request.ok || !result.ok) {
        throw new Error(result.error || "We could not send your enquiry. Please try again.");
      }

      form.reset();
      setStatus({
        message: "Thanks—your enquiry has been sent. James will be in touch as soon as he can.",
        type: "success",
      });
    } catch (error) {
      setStatus({
        message: error instanceof Error ? error.message : "We could not send your enquiry. Please call James instead.",
        type: "error",
      });
    } finally {
      setIsSending(false);
    }
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
      <form className="contact-form" onSubmit={submitForm} aria-busy={isSending}>
        <label className="form-honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
        <div className="form-row">
          <label>Name<input name="name" autoComplete="name" required placeholder="Your name" /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required placeholder="you@email.com" /></label>
        </div>
        <div className="form-row">
          <label>Phone<input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" /></label>
          <label>Service<select name="service" defaultValue=""><option value="" disabled>What can we help with?</option><option>Plumbing</option><option>Gas fitting</option><option>Hot water</option><option>Renovation or fit-out</option><option>General enquiry</option></select></label>
        </div>
        <label>Project details<textarea name="message" rows={5} required placeholder="Tell us a little about the job…" /></label>
        <div className="form-submit"><button className="button primary" type="submit" disabled={isSending}>{isSending ? "Sending…" : "Send enquiry"} <span aria-hidden="true">→</span></button><small>No obligation. We’ll respond as soon as we can.</small></div>
        <p className={`form-status ${status.type}`} aria-live="polite">{status.message}</p>
      </form>
    </section>
  );
}
