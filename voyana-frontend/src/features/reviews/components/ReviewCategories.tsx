import type {
  ReviewCategoryScore,
  ReviewSummary,
} from "../types/review.types";

type ReviewCategoriesProps = {
  categories: readonly ReviewCategoryScore[];
  className?: string;
  layout?: "grid" | "list";
  showSummary?: boolean;
  summary: ReviewSummary;
  surface?: "card" | "bare";
};

const layoutClasses = {
  grid: "grid min-w-0 flex-1 gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3",
  list: "grid min-w-0 gap-4",
} as const;

const surfaceClasses = {
  bare: "",
  card: "rounded-xl border border-(--voyana-color-border-subtle) bg-white p-5 shadow-none sm:p-6",
} as const;

export function ReviewCategories({
  categories,
  className = "mt-8",
  layout = "grid",
  showSummary = true,
  summary,
  surface = "card",
}: ReviewCategoriesProps) {
  return (
    <div className={`${className} ${surfaceClasses[surface]}`}>
      <div
        className={
          showSummary
            ? "flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8"
            : ""
        }
      >
        {showSummary ? (
          <div className="flex shrink-0 items-center gap-4 lg:w-72">
            <div className="grid size-16 place-items-center rounded-lg bg-(--voyana-color-text-primary) text-2xl font-semibold text-(--voyana-color-white)">
              {summary.score.toFixed(1)}
            </div>
            <div>
              <h3 className="text-xl font-semibold leading-tight text-(--voyana-color-text-primary)">
                {summary.label}
              </h3>
              <p className="mt-1 text-sm font-medium text-(--voyana-color-text-muted)">
                {summary.reviewCount} verified reviews
              </p>
            </div>
          </div>
        ) : null}

        <div className={layoutClasses[layout]}>
          {categories.map((category) => (
            <div key={category.label} className="min-w-0">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="truncate text-sm font-semibold text-(--voyana-color-text-primary)">
                  {category.label}
                </p>
                <p className="shrink-0 text-sm font-semibold text-(--voyana-color-text-primary)">
                  {category.score.toFixed(1)}
                </p>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[rgb(var(--voyana-rgb-border-subtle)/0.76)]">
                <div
                  className="h-full rounded-full bg-(--voyana-color-text-primary)"
                  style={{ width: `${category.score * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
