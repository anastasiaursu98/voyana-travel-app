import { AppTypography } from "../../../shared/ui";
import { useState } from "react";
import { RatingSummaryBadge } from "../../../shared/components/RatingSummaryBadge";
import { AppButton } from "../../../shared/ui";
import type {
  Review,
  ReviewCategoryScore,
  ReviewSummary,
} from "../types/review.types";
import { ReviewCard } from "./ReviewCard";
import { ReviewCategories } from "./ReviewCategories";
import { ReviewsModal } from "./ReviewsModal";

type ReviewsSectionProps = {
  categories: readonly ReviewCategoryScore[];
  description: string;
  eyebrow?: string;
  reviews: readonly Review[];
  summary: ReviewSummary;
  title: string;
};

export function ReviewsSection({
  categories,
  description,
  eyebrow = "Guest reviews",
  reviews,
  summary,
  title,
}: ReviewsSectionProps) {
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const previewReviews = reviews.slice(0, 3);

  return (
    <section className="border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.72)] pt-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase leading-none tracking-normal text-(--voyana-color-text-muted)">
            {eyebrow}
          </p>
          <AppTypography variant="sectionTitle" className="mt-3 leading-tight tracking-normal text-(--voyana-color-text-primary)">
            {title}
          </AppTypography>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-(--voyana-color-text-body) sm:text-base">
            {description}
          </p>
        </div>

        <RatingSummaryBadge
          className="md:justify-end"
          label={summary.label}
          reviewCount={summary.reviewCount}
          score={summary.score}
        />
      </div>

      <ReviewCategories categories={categories} summary={summary} />

      <div className="-mx-6 mt-8 flex snap-x gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {previewReviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-(--voyana-radius-panel) border border-(--voyana-color-border-subtle) bg-(--voyana-color-background-card) p-5 shadow-none sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <AppTypography variant="cardTitle" className=" text-(--voyana-color-text-primary)">
            Read all reviews
          </AppTypography>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-(--voyana-color-text-body)">
            Browse every verified guest review, filter by category, and compare
            feedback before choosing this destination package.
          </p>
        </div>
        <AppButton
          type="button"
          intent="secondary"
          surface="light"
          onClick={() => setIsReviewsModalOpen(true)}
          sx={{ borderRadius: "var(--voyana-radius-pill)", flexShrink: 0 }}
        >
          Read all reviews
        </AppButton>
      </div>

      <ReviewsModal
        categories={categories}
        open={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        reviews={reviews}
        summary={summary}
      />
    </section>
  );
}
