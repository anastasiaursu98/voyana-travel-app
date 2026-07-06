import { ReviewsSection } from "../../../../reviews";
import type { OfferReviewsContent } from "../../../types/offerDetails.types";

type OfferReviewsProps = {
  content?: OfferReviewsContent;
};

export function OfferReviews({ content }: OfferReviewsProps) {
  if (!content) {
    return null;
  }

  return (
    <ReviewsSection
      categories={content.categories}
      description={
        content.description ??
        "Verified guest feedback helps travelers compare the offer before booking."
      }
      eyebrow={content.eyebrow}
      reviews={content.reviews}
      summary={content.summary}
      title={content.title ?? "Guest reviews"}
    />
  );
}
