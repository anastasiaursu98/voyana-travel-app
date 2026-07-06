import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import { Link as RouterLink } from "react-router-dom";
import { ResponsiveImage } from "../../../../shared/components/ResponsiveImage";

type DestinationCardProps = {
  description?: string;
  imageAlt: string;
  imageUrl: string;
  link?: string;
  location: string;
  priceLabel?: string;
  title: string;
};

export function DestinationCard({
  description,
  imageAlt,
  imageUrl,
  link,
  location,
  priceLabel,
  title,
}: DestinationCardProps) {
  return (
    <article className="group min-w-0 overflow-hidden rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] bg-white shadow-[0_18px_46px_rgb(var(--voyana-rgb-text-strong)/0.08)] transition duration-300 hover:-translate-y-1 hover:border-[rgb(var(--voyana-rgb-accent-teal)/0.34)] hover:shadow-[0_26px_64px_rgb(var(--voyana-rgb-text-strong)/0.13)]">
      <RouterLink
        to={link ?? "#"}
        className="grid h-full min-w-0 grid-rows-[auto_1fr]"
      >
        <div className="relative aspect-[16/10] min-w-0 overflow-hidden bg-(--voyana-color-background-section)">
          <ResponsiveImage
            src={imageUrl}
            alt={imageAlt}
            className="transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgb(var(--voyana-rgb-background-dark)/0)_0%,rgb(var(--voyana-rgb-background-dark)/0.54)_100%)]" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[rgb(var(--voyana-rgb-background-dark)/0.76)] px-3 py-1 text-xs font-black text-(--voyana-color-white) shadow-[0_12px_28px_rgb(var(--voyana-rgb-background-dark)/0.18)] backdrop-blur-md">
            <PublicRoundedIcon className="text-[0.95rem]" />
            {location}
          </span>
          {priceLabel ? (
            <span className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-full bg-[rgb(var(--voyana-rgb-accent-warm)/0.96)] px-3 py-1 text-xs font-black text-(--voyana-color-button-primary-text) shadow-[0_12px_28px_rgb(var(--voyana-rgb-background-dark)/0.18)]">
              {priceLabel}
            </span>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-4 p-4 sm:p-5">
          <div className="min-w-0">
            <h3 className="text-2xl font-black leading-tight text-(--voyana-color-text-strong)">
              {title}
            </h3>
            {description ? (
              <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-(--voyana-color-text-body)">
                {description}
              </p>
            ) : null}
          </div>
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.78)] pt-4">
            <span className="text-sm font-black text-(--voyana-color-text-primary)">
              View offers
            </span>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-(--voyana-color-background-dark) text-(--voyana-color-white) transition-colors group-hover:bg-(--voyana-color-accent-teal-strong)">
              <ArrowForwardRoundedIcon className="text-[1.1rem]" />
            </span>
          </div>
        </div>
      </RouterLink>
    </article>
  );
}
