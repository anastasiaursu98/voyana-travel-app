import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { Dialog, IconButton } from "@mui/material";
import type {
  Review,
  ReviewCategoryScore,
  ReviewSummary,
} from "../types/review.types";
import { ReviewCategories } from "./ReviewCategories";

type ReviewsModalProps = {
  categories: readonly ReviewCategoryScore[];
  open: boolean;
  onClose: () => void;
  reviews: readonly Review[];
  summary: ReviewSummary;
};

const starSlots = [1, 2, 3, 4, 5] as const;
const reviewFilters = [
  "All reviews",
  "Families",
  "Couples",
  "Recent",
  "Highest rated",
] as const;

const getReviewInitials = (review: Review) =>
  review.avatarInitials ??
  review.name
    .split(" ")
    .map((namePart) => namePart[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function ReviewsModal({
  categories,
  open,
  onClose,
  reviews,
  summary,
}: ReviewsModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            bgcolor: "var(--voyana-color-background-card)",
            borderRadius: { xs: 0, sm: 3 },
            height: { xs: "100%", sm: "min(86vh, 840px)" },
            m: { xs: 0, sm: 3 },
            maxHeight: { xs: "100%", sm: "86vh" },
            width: { xs: "100%", sm: "calc(100% - 48px)" },
          },
        },
      }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-(--voyana-color-border-subtle) bg-(--voyana-color-background-card) px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase leading-none tracking-normal text-(--voyana-color-text-muted)">
            Guest reviews
          </p>
          <h2 className="mt-2 truncate text-2xl font-semibold tracking-normal text-(--voyana-color-text-primary)">
            All reviews
          </h2>
        </div>

        <IconButton
          aria-label="Close reviews modal"
          onClick={onClose}
          sx={{
            color: "var(--voyana-color-text-primary)",
            "&:hover": {
              bgcolor: "var(--voyana-color-background-input)",
            },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </div>

      <div className="grid min-h-0 gap-6 overflow-y-auto bg-(--voyana-color-white) px-5 py-5 sm:px-6 lg:grid-cols-[minmax(18rem,0.38fr)_minmax(0,0.62fr)] lg:gap-8">
        <aside className="lg:sticky lg:top-0 lg:self-start">
          <div className="rounded-xl border border-(--voyana-color-border-subtle) bg-(--voyana-color-background-card) p-5 shadow-[0_16px_42px_rgb(var(--voyana-rgb-text-strong)/0.05)] sm:p-6">
            <div className="flex items-center gap-4">
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

            <p className="mt-5 text-sm font-medium leading-6 text-(--voyana-color-text-body)">
              Guests rated this stay highly for location, staff, comfort, and
              overall value.
            </p>

            <div className="mt-5 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.72)] pt-5">
              <ReviewCategories
                categories={categories}
                className=""
                layout="list"
                showSummary={false}
                summary={summary}
                surface="bare"
              />
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex min-h-12 flex-1 items-center gap-3 rounded-full border border-(--voyana-color-border-subtle) bg-(--voyana-color-background-card) px-4 shadow-[0_10px_26px_rgb(var(--voyana-rgb-text-strong)/0.04)]">
              <SearchRoundedIcon className="shrink-0 text-(--voyana-color-text-muted)" />
              <input
                type="search"
                placeholder="Search reviews"
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-(--voyana-color-text-primary) outline-none placeholder:text-(--voyana-color-text-muted)"
              />
            </label>

            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-(--voyana-color-border-subtle) bg-(--voyana-color-background-card) px-4 text-sm font-bold text-(--voyana-color-text-primary) shadow-[0_10px_26px_rgb(var(--voyana-rgb-text-strong)/0.04)] transition hover:bg-(--voyana-color-background-input) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.18)]"
            >
              <TuneRoundedIcon fontSize="small" />
              Sort
            </button>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {reviewFilters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
                  index === 0
                    ? "border-(--voyana-color-button-primary) bg-(--voyana-color-button-primary) text-(--voyana-color-button-primary-text)"
                    : "border-(--voyana-color-border-subtle) bg-transparent text-(--voyana-color-text-body) hover:bg-(--voyana-color-background-input)"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4">
            {reviews.map((review) => (
              <article
                key={review.name}
                className="rounded-xl border border-(--voyana-color-border-subtle) bg-(--voyana-color-background-card) p-5 shadow-[0_12px_32px_rgb(var(--voyana-rgb-text-strong)/0.04)]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid size-12 shrink-0 place-items-center rounded-full bg-[rgb(var(--voyana-rgb-button-primary)/0.24)] text-sm font-black text-(--voyana-color-text-primary)">
                      {review.avatarUrl ? (
                        <img
                          src={review.avatarUrl}
                          alt={`${review.name} avatar`}
                          className="h-full w-full rounded-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        getReviewInitials(review)
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold leading-tight text-(--voyana-color-text-primary)">
                        {review.name}
                      </h3>
                      {review.location ? (
                        <p className="mt-1 truncate text-xs font-medium text-(--voyana-color-text-muted)">
                          {review.location}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-(--voyana-color-background-input) px-2.5 py-1 text-xs font-bold text-(--voyana-color-text-body)">
                      <VerifiedRoundedIcon className="text-[0.95rem] text-(--voyana-color-accent-teal-strong)" />
                      Verified
                    </span>
                    <span className="rounded-lg bg-(--voyana-color-text-primary) px-2.5 py-1.5 text-sm font-semibold leading-none text-(--voyana-color-white)">
                      {(review.rating * 2).toFixed(1)}
                    </span>
                  </div>
                </div>

                <div
                  aria-label={`${review.rating} out of 5 stars`}
                  className="mt-4 flex items-center gap-0.5"
                >
                  {starSlots.map((slot) => (
                    <StarRoundedIcon
                      key={slot}
                      fontSize="small"
                      className={
                        slot <= review.rating
                          ? "text-(--voyana-color-accent-warm)"
                          : "text-[rgb(var(--voyana-rgb-border-subtle)/0.9)]"
                      }
                    />
                  ))}
                </div>

                <p className="mt-4 text-sm font-medium leading-7 text-(--voyana-color-text-body)">
                  {review.quote}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.72)] pt-4 text-xs font-bold text-(--voyana-color-text-muted)">
                  <span>
                    {review.stayType ?? review.destination ?? "Verified stay"}
                  </span>
                  {review.date ? (
                    <>
                      <span className="h-1 w-1 rounded-full bg-[rgb(var(--voyana-rgb-text-muted)/0.4)]" />
                      <span>{review.date}</span>
                    </>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
