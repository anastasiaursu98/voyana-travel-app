import { ReviewsSection } from "../../../../reviews";
import {
  beachResortReviewCategories,
  beachResortReviews,
  beachResortReviewSummary,
} from "./content/beachResortReviews.content";

export const BeachResortVacationPackageDetails = () => {
  return (
    <ReviewsSection
      categories={beachResortReviewCategories}
      description="Verified guest feedback helps travelers understand the resort comfort, all-inclusive service, beach location, and booking experience before choosing a package."
      reviews={beachResortReviews}
      summary={beachResortReviewSummary}
      title="Guest reviews"
    />
  );
};
