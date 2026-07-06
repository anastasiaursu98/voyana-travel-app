import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

type RatingSummaryBadgeProps = {
  className?: string;
  label: string;
  reviewCount?: number;
  reviewLabel?: string;
  score: number;
};

export function RatingSummaryBadge({
  className = "",
  label,
  reviewCount,
  reviewLabel,
  score,
}: RatingSummaryBadgeProps) {
  const formattedScore = score.toFixed(1);
  const reviewsText =
    reviewLabel ??
    (reviewCount !== undefined
      ? `${formattedScore} from ${reviewCount} reviews`
      : formattedScore);

  return (
    <div
      className={`flex w-full max-w-72 items-center gap-4 rounded-xl border border-(--voyana-color-border-subtle) bg-white p-4 shadow-none ${className}`}
    >
      <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-(--voyana-color-text-primary)">
        <RateReviewOutlinedIcon className="text-(--voyana-color-white)" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold leading-tight text-(--voyana-color-text-primary)">
          {label}
        </p>
        <p className="mt-1 text-xs font-bold text-(--voyana-color-text-muted)">
          {reviewsText}
        </p>
      </div>
    </div>
  );
}
