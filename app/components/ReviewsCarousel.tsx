"use client";

import { useCallback, useEffect, useState } from "react";
import type { GoogleReview } from "../lib/google-reviews";

type ReviewsCarouselProps = {
  reviews: GoogleReview[];
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
};

const Arrow = ({ direction }: { direction: "left" | "right" }) => (
  <svg aria-hidden="true" viewBox="0 0 20 20">
    <path d={direction === "left" ? "M16 10H5m4-5-5 5 5 5" : "M4 10h11m-4-5 5 5-5 5"} />
  </svg>
);

export default function ReviewsCarousel({
  reviews,
  rating,
  reviewCount,
  reviewsUrl,
}: ReviewsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const goToReview = useCallback(
    (index: number) => {
      setActiveIndex((index + reviews.length) % reviews.length);
    },
    [reviews.length],
  );

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionQuery.matches);
    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);
    return () => motionQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (manuallyPaused || interactionPaused || reducedMotion || reviews.length < 2) return;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % reviews.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [manuallyPaused, interactionPaused, reducedMotion, reviews.length]);

  return (
    <div
      className="reviews-carousel"
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteractionPaused(false);
      }}
    >
      <div className="reviews-summary">
        <span className="google-mark" aria-hidden="true">G</span>
        <strong>{rating.toFixed(1)}</strong>
        <span className="review-stars" aria-label={`${rating} out of 5 stars`}>★★★★★</span>
        <a href={reviewsUrl} target="_blank" rel="noreferrer">
          {reviewCount} Google reviews
        </a>
      </div>

      <div className="reviews-window">
        <div
          className="reviews-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {reviews.map((review, index) => (
            <article
              className="review-card"
              key={`${review.authorName}-${index}`}
              aria-hidden={index !== activeIndex}
            >
              <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
                {"★".repeat(Math.round(review.rating))}
              </div>
              <blockquote>“{review.text}”</blockquote>
              <p className="review-author">
                {review.authorPhotoUri ? (
                  // Google supplies this URL as part of the reviewer attribution.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={review.authorPhotoUri} alt="" width="42" height="42" />
                ) : (
                  <span aria-hidden="true">{review.authorName.charAt(0)}</span>
                )}
                <span>
                  {review.authorUri ? (
                    <a href={review.authorUri} target="_blank" rel="noreferrer" tabIndex={index === activeIndex ? 0 : -1}>
                      {review.authorName}
                    </a>
                  ) : (
                    <strong>{review.authorName}</strong>
                  )}
                  {review.relativePublishTimeDescription && (
                    <small>{review.relativePublishTimeDescription}</small>
                  )}
                </span>
              </p>
              <a className="review-source" href={review.googleMapsUri} target="_blank" rel="noreferrer" tabIndex={index === activeIndex ? 0 : -1}>
                View on Google
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="review-controls">
        <button type="button" onClick={() => goToReview(activeIndex - 1)} aria-label="Previous review">
          <Arrow direction="left" />
        </button>
        <div className="review-dots" aria-label="Choose a review">
          {reviews.map((review, index) => (
            <button
              type="button"
              key={`${review.authorName}-dot`}
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => goToReview(index)}
              aria-label={`Show review ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <button type="button" onClick={() => setManuallyPaused((current) => !current)} aria-label={manuallyPaused ? "Play reviews" : "Pause reviews"}>
          {manuallyPaused ? "▶" : "Ⅱ"}
        </button>
        <button type="button" onClick={() => goToReview(activeIndex + 1)} aria-label="Next review">
          <Arrow direction="right" />
        </button>
      </div>

      <p className="reviews-attribution">
        Five-star reviews provided by Google, shown newest first.
      </p>
    </div>
  );
}
