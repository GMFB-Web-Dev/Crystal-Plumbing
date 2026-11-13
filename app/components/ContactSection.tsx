"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { FormEvent, useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (container: HTMLElement, options: {
    sitekey: string;
    action: string;
    theme: "light";
    size: "flexible" | "compact";
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": () => void;
  }) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export default function ContactSection() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";
  const [status, setStatus] = useState<{ message: string; type: "idle" | "success" | "error" }>({
    message: "",
    type: "idle",
  });
  const [isSending, setIsSending] = useState(false);
  const isSubmitting = useRef(false);
  const requestId = useRef<string | null>(null);
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidget = useRef<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  useEffect(() => {
    const turnstile = window.turnstile;
    if (!turnstileReady || !turnstile || !turnstileContainer.current) return;

    const widgetId = turnstile.render(turnstileContainer.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAF_WmtpkdcmpoUST",
      action: "contact",
      theme: "light",
      size: turnstileContainer.current.clientWidth < 300 ? "compact" : "flexible",
      callback: (token) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => {
        setTurnstileToken("");
        setStatus({ message: "Verification failed to load. Please refresh the page or call James.", type: "error" });
      },
    });
    turnstileWidget.current = widgetId;

    return () => {
      turnstileWidget.current = null;
      turnstile.remove(widgetId);
    };
  }, [turnstileReady]);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting.current) return;
    if (!turnstileToken) {
      setStatus({ message: "Please complete the verification before sending your enquiry.", type: "error" });
      return;
    }

    const form = event.currentTarget;
    requestId.current ||= crypto.randomUUID();
    const data = {
      ...Object.fromEntries(new FormData(form)),
      requestId: requestId.current,
      "cf-turnstile-response": turnstileToken,
    };
    isSubmitting.current = true;
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
      requestId.current = null;
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
      setTurnstileToken("");
      if (turnstileWidget.current !== null) {
        window.turnstile?.reset(turnstileWidget.current);
      }
      isSubmitting.current = false;
      setIsSending(false);
    }
  }

  return (
    <section className={`contact-form-section${isContactPage ? " contact-page-form" : ""}`} id="quote">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setTurnstileReady(true)}
        onError={() => setStatus({ message: "Verification failed to load. Please refresh the page or call James.", type: "error" })}
      />
      <div className="contact-form-intro">
        <p className="eyebrow light">Ready when you are</p>
        <h2>Tell us what<br />needs sorting.</h2>
        <p>Share a few details and we’ll come back with clear advice, honest timing and the right next step.</p>
        <div className="contact-direct">
          <a href="tel:0276976797" aria-label="Call James on 027 697 6797">
            <span><small>Call James</small><strong>027 697 6797</strong></span>
            <b aria-hidden="true">↗</b>
          </a>
          <a href="mailto:info@crystalplumbing.co.nz" aria-label="Email info@crystalplumbing.co.nz">
            <span><small>Email</small><strong>info@crystalplumbing.co.nz</strong></span>
            <b aria-hidden="true">↗</b>
          </a>
        </div>
      </div>
      <form className="contact-form" onSubmit={submitForm} aria-busy={isSending}>
        <label className="form-honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
        <div className="form-row">
          <label>Name<input name="name" autoComplete="name" required maxLength={100} placeholder="Your name" /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@email.com" /></label>
        </div>
        <div className="form-row">
          <label>Phone<input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} pattern="(?:\d|\s|\+|\(|\)|-){7,40}" placeholder="Your phone number" /></label>
          <label>Service<select name="service" defaultValue="" required><option value="" disabled>What can we help with?</option><option>Plumbing</option><option>Gas fitting</option><option>Hot water</option><option>Renovation or fit-out</option><option>General enquiry</option></select></label>
        </div>
        <label>Project details (optional)<textarea name="message" rows={5} maxLength={4000} placeholder="Tell us a little about the job…" /></label>
        <div ref={turnstileContainer} className="contact-verification" aria-label="Bot verification" />
        <div className="form-submit"><button className="button primary" type="submit" disabled={isSending || !turnstileToken}>{isSending ? "Sending…" : "Send enquiry"} <span aria-hidden="true">→</span></button><small>No obligation. We’ll respond as soon as we can.</small></div>
        <p className="form-privacy">By sending this form, you agree that we may use your details to respond to your enquiry. See our <Link href="/privacy-policy">privacy policy</Link>.</p>
        <p className={`form-status ${status.type}`} role="status" aria-live="polite">{status.message}</p>
      </form>
    </section>
  );
}
