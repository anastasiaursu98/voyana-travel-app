import StarRoundedIcon from "@mui/icons-material/StarRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import type { Review } from "../types/review.types";

type ReviewCardProps = {
  review: Review;
};

const starSlots = [1, 2, 3, 4, 5] as const;

const getReviewInitials = (review: Review) =>
  review.avatarInitials ??
  review.name
    .split(" ")
    .map((namePart) => namePart[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function ReviewCard({ review }: ReviewCardProps) {
  const reviewMeta = review.stayType ?? review.destination;

  return (
    <article className="flex min-h-72 w-[calc(100vw-3rem)] max-w-96 shrink-0 snap-start flex-col rounded-xl border border-(--voyana-color-border-subtle) bg-white p-5 shadow-none sm:w-88 lg:w-auto lg:max-w-none">
      <div className="flex items-start justify-between gap-4">
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

        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-(--voyana-color-background-input) px-2.5 py-1 text-xs font-bold text-(--voyana-color-text-body)">
          <VerifiedRoundedIcon className="text-[0.95rem] text-(--voyana-color-accent-teal-strong)" />
          Verified
        </span>
      </div>

      <div
        aria-label={`${review.rating} out of 5 stars`}
        className="mt-5 flex items-center gap-0.5"
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

      <p className="mt-4 overflow-hidden text-sm font-medium leading-6 text-(--voyana-color-text-body) [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]">
        {review.quote}
      </p>

      <div className="mt-auto border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.72)] pt-4">
        {reviewMeta ? (
          <p className="text-xs font-black uppercase tracking-normal text-(--voyana-color-text-muted)">
            {reviewMeta}
          </p>
        ) : null}
        {review.date ? (
          <p className="mt-1 text-xs font-semibold text-[rgb(var(--voyana-rgb-text-muted)/0.82)]">
            {review.date}
          </p>
        ) : null}
      </div>
    </article>
  );
}
