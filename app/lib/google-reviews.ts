export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Crystal+Plumbing+%26+Gas+Ltd/@-36.8323794,174.3969253,10z/data=!4m8!3m7!1s0xfbd28cd5a9843ef:0xe7e54f2cdefcded9!8m2!3d-36.8328344!4d174.7265725!9m1!1b1!16s%2Fg%2F11wjl5wnth";

export type GoogleReview = {
  authorName: string;
  authorUri?: string;
  authorPhotoUri?: string;
  text: string;
  rating: number;
  relativePublishTimeDescription?: string;
  googleMapsUri: string;
};

export type GoogleReviewsResult = {
  reviews: GoogleReview[];
  rating: number;
  reviewCount: number;
  isLive: boolean;
};

const fallbackReviews: GoogleReview[] = [
  {
    authorName: "Peter Mills",
    text: "Excellent service and workmanship. James did a fantastic job at my property — professional, reliable and very tidy. The work was completed to a high standard and I wouldn’t hesitate to recommend him.",
    rating: 5,
    relativePublishTimeDescription: "a month ago",
    googleMapsUri: GOOGLE_REVIEWS_URL,
  },
  {
    authorName: "Jeremy Hava",
    text: "James is amazing! Very reliable, great communication and cares a lot about his work! Will only be using Crystal Plumbing moving forward. Highly recommended!",
    rating: 5,
    relativePublishTimeDescription: "4 months ago",
    googleMapsUri: GOOGLE_REVIEWS_URL,
  },
  {
    authorName: "Sherry Chu",
    text: "James is super efficient and reliable. As a family newly moved to Auckland, he has helped us a great deal. Highly recommend!",
    rating: 5,
    relativePublishTimeDescription: "7 months ago",
    googleMapsUri: GOOGLE_REVIEWS_URL,
  },
  {
    authorName: "Lynne Abbot",
    text: "James is a reliable, skilled, efficient, tidy plumber who is great to deal with. I am very grateful to have found him to facilitate a stress-free plumbing upgrade of my laundry. Totally recommend his services.",
    rating: 5,
    relativePublishTimeDescription: "9 months ago",
    googleMapsUri: GOOGLE_REVIEWS_URL,
  },
  {
    authorName: "Naomi Reynolds",
    text: "James did a great job replacing my leaking shower. Looks great and left the place clean and tidy. Would recommend!",
    rating: 5,
    relativePublishTimeDescription: "5 months ago",
    googleMapsUri: GOOGLE_REVIEWS_URL,
  },
  {
    authorName: "AJ Blair",
    text: "Thank you James for your part in transforming my bathroom. Your attention to detail and work is truly appreciated!",
    rating: 5,
    relativePublishTimeDescription: "3 months ago",
    googleMapsUri: GOOGLE_REVIEWS_URL,
  },
  {
    authorName: "Samuel Lawson",
    text: "Highly recommend James. He expertly fit out our kitchen and bathroom. Super efficient and tidy. We are very happy with the result!",
    rating: 5,
    relativePublishTimeDescription: "10 months ago",
    googleMapsUri: GOOGLE_REVIEWS_URL,
  },
];

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    rating?: number;
    relativePublishTimeDescription?: string;
    googleMapsUri?: string;
    text?: { text?: string };
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }>;
};

export async function getGoogleReviews(): Promise<GoogleReviewsResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return { reviews: fallbackReviews, rating: 5, reviewCount: 23, isLive: false };
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "rating,userRatingCount,reviews,googleMapsUri",
        },
        next: { revalidate: 21600, tags: ["google-reviews"] },
      },
    );

    if (!response.ok) {
      throw new Error(`Google Places returned ${response.status}`);
    }

    const data = (await response.json()) as PlacesResponse;
    const reviews = (data.reviews ?? [])
      .map((review): GoogleReview | null => {
        const text = review.text?.text?.trim();
        const authorName = review.authorAttribution?.displayName?.trim();

        if (!text || !authorName) return null;

        return {
          authorName,
          authorUri: review.authorAttribution?.uri,
          authorPhotoUri: review.authorAttribution?.photoUri,
          text,
          rating: review.rating ?? 5,
          relativePublishTimeDescription:
            review.relativePublishTimeDescription,
          googleMapsUri:
            review.googleMapsUri ?? data.googleMapsUri ?? GOOGLE_REVIEWS_URL,
        };
      })
      .filter((review): review is GoogleReview => review !== null);

    if (reviews.length === 0) {
      throw new Error("Google Places returned no readable reviews");
    }

    return {
      reviews,
      rating: data.rating ?? 5,
      reviewCount: data.userRatingCount ?? reviews.length,
      isLive: true,
    };
  } catch (error) {
    console.error("Unable to refresh Google reviews; using verified fallback.", error);
    return { reviews: fallbackReviews, rating: 5, reviewCount: 23, isLive: false };
  }
}
