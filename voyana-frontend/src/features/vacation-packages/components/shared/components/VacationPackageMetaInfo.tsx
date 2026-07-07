import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

type VacationPackageMetaInfoProps = {
  className?: string;
  location: string;
  rating?: number;
  ratingLabel?: string;
};

export function VacationPackageMetaInfo({
  className = "",
  location,
  rating,
  ratingLabel,
}: VacationPackageMetaInfoProps) {
  const shouldShowRating = rating !== undefined || ratingLabel !== undefined;

  return (
    <div
      className={`flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-(--voyana-color-text-muted) ${className}`}
    >
      <span className="inline-flex min-w-0 items-center gap-1.5">
        <PublicRoundedIcon className="shrink-0 text-[1rem]" />
        <span className="truncate">{location}</span>
      </span>
      {shouldShowRating ? (
        <>
          <span className="h-1 w-1 shrink-0 rounded-full bg-[rgb(var(--voyana-rgb-text-muted)/0.34)]" />
          <span className="inline-flex shrink-0 items-center gap-1.5 text-(--voyana-color-text-primary)">
            <StarRoundedIcon className="text-[1.1rem] text-(--voyana-color-accent-warm)" />
            {ratingLabel ?? rating?.toFixed(1)}
          </span>
        </>
      ) : null}
    </div>
  );
}
