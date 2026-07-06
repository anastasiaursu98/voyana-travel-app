import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

type OfferMetaInfoProps = {
  className?: string;
  location: string;
  rating?: number;
  ratingLabel?: string;
};

export function OfferMetaInfo({
  className = "",
  location,
  rating,
  ratingLabel,
}: OfferMetaInfoProps) {
  const shouldShowRating = rating !== undefined || ratingLabel !== undefined;

  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-(--voyana-color-text-muted) ${className}`}
    >
      <span className="inline-flex items-center gap-1.5">
        <PublicRoundedIcon className="text-[1rem]" />
        {location}
      </span>
      {shouldShowRating ? (
        <>
          <span className="h-1 w-1 rounded-full bg-[rgb(var(--voyana-rgb-text-muted)/0.34)]" />
          <span className="inline-flex items-center gap-1.5 text-(--voyana-color-text-primary)">
            <StarRoundedIcon className="text-[1.1rem] text-(--voyana-color-accent-warm)" />
            {ratingLabel ?? rating?.toFixed(1)}
          </span>
        </>
      ) : null}
    </div>
  );
}
