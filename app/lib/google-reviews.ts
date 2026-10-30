export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Crystal+Plumbing+%26+Gas+Ltd/@-36.8323794,174.3969253,10z/data=!4m8!3m7!1s0xfbd28cd5a9843ef:0xe7e54f2cdefcded9!8m2!3d-36.8328344!4d174.7265725!9m1!1b1!16s%2Fg%2F11wjl5wnth";

export type GoogleReview = {
  authorName: string;
  authorUri?: string;
  authorPhotoUri?: string;
  text: string;
  rating: number;
  publishTime?: string;
  relativePublishTimeDescription?: string;
  googleMapsUri: string;
};

export type GoogleReviewsResult = {
  reviews: GoogleReview[];
  rating: number;
  reviewCount: number;
  isLive: boolean;
};

type PlacesResponse = {
  status?: string;
  error_message?: string;
  result?: {
    rating?: number;
    user_ratings_total?: number;
    url?: string;
    reviews?: Array<{
      author_name?: string;
      author_url?: string;
      profile_photo_url?: string;
      rating?: number;
      relative_time_description?: string;
      text?: string;
      time?: number;
    }>;
  };
};

function newestFiveStarReviews(reviews: GoogleReview[]) {
  return reviews
    .filter((review) => review.rating === 5)
    .sort((first, second) => {
      const firstPublished = first.publishTime ? Date.parse(first.publishTime) : 0;
      const secondPublished = second.publishTime ? Date.parse(second.publishTime) : 0;

      return secondPublished - firstPublished;
    })
    .slice(0, 5);
}

export async function getGoogleReviews(): Promise<GoogleReviewsResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return { reviews: [], rating: 0, reviewCount: 0, isLive: false };
  }

  try {
    const query = new URLSearchParams({
      place_id: placeId,
      fields: "rating,user_ratings_total,reviews,url",
      reviews_sort: "newest",
      key: apiKey,
    });
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${query}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error(`Google Places returned ${response.status}`);
    }

    const data = (await response.json()) as PlacesResponse;
    if (data.status !== "OK") {
      throw new Error(`Google Places returned ${data.status ?? "an unknown status"}`);
    }

    const reviews = (data.result?.reviews ?? [])
      .map((review): GoogleReview | null => {
        const text = review.text?.trim();
        const authorName = review.author_name?.trim();

        if (!text || !authorName) return null;

        return {
          authorName,
          authorUri: review.author_url,
          authorPhotoUri: review.profile_photo_url,
          text,
          rating: review.rating ?? 0,
          publishTime: review.time
            ? new Date(review.time * 1000).toISOString()
            : undefined,
          relativePublishTimeDescription: review.relative_time_description,
          googleMapsUri: data.result?.url ?? GOOGLE_REVIEWS_URL,
        };
      })
      .filter((review): review is GoogleReview => review !== null);
    const fiveStarReviews = newestFiveStarReviews(reviews);

    if (fiveStarReviews.length === 0) {
      throw new Error("Google Places returned no readable five-star reviews");
    }

    return {
      reviews: fiveStarReviews,
      rating: data.result?.rating ?? 5,
      reviewCount: data.result?.user_ratings_total ?? fiveStarReviews.length,
      isLive: true,
    };
  } catch (error) {
    console.error("Unable to load the latest Google reviews.", error);
    return { reviews: [], rating: 0, reviewCount: 0, isLive: false };
  }
}
