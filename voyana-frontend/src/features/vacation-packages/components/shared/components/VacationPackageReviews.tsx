import { ReviewsSection } from "../../../../reviews";
import type { VacationPackageReviewsContent } from "../../../types/vacationPackageDetails.types";

type VacationPackageReviewsProps = {
  content?: VacationPackageReviewsContent;
};

export function VacationPackageReviews({ content }: VacationPackageReviewsProps) {
  if (!content) {
    return null;
  }

  return (
    <ReviewsSection
      categories={content.categories}
      description={
        content.description ??
        "Verified guest feedback helps travelers compare the vacation package before booking."
      }
      eyebrow={content.eyebrow}
      reviews={content.reviews}
      summary={content.summary}
      title={content.title ?? "Guest reviews"}
    />
  );
}
