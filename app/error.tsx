"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="not-found-page" role="alert">
      <p className="eyebrow light">Something went wrong</p>
      <h1>We couldn&apos;t load this page.</h1>
      <p>Please try again. You can also call James directly on 027 697 6797.</p>
      <button className="button primary" type="button" onClick={reset}>Try again</button>
    </section>
  );
}
