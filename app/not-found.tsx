import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <p className="eyebrow light">404 · Page not found</p>
      <h1>That page has gone down the drain.</h1>
      <p>The link may be old, but the help you need is still close by.</p>
      <div className="hero-actions">
        <Link className="button primary" href="/">Back to home</Link>
        <Link className="button primary" href="/contact">Request a quote</Link>
      </div>
    </section>
  );
}
