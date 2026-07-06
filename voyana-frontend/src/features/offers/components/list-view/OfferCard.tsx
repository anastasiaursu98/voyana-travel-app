import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import { generatePath, Link as RouterLink } from "react-router-dom";
import { routes } from "../../../../app/router/routes";
import { ResponsiveImage } from "../../../../shared/components/ResponsiveImage";
import type { Offer } from "../../types/offer.types";
import { OfferMetaInfo } from "../shared/components";

interface Props {
  offer: Offer;
}

const formatPrice = (amount: number, currency: Offer["pricing"]["currency"]) =>
  new Intl.NumberFormat("en-US", {
    currency,
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);

const getOfferDetailsPath = (offer: Offer) => {
  return generatePath(routes.offerDetails, {
    offerCode: offer.code,
    offerId: offer._id,
  });
};

export const OfferCard = ({ offer }: Props) => {
  const coverImage = offer.media.coverImage;
  const offerPath = getOfferDetailsPath(offer);
  const duration = offer.travelPeriod.duration;
  const priceUnit = offer.pricing.unit ? `/${offer.pricing.unit}` : "";

  return (
    <RouterLink
      to={offerPath}
      className="group grid min-w-0 overflow-hidden rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.92)] bg-white shadow-[0_18px_45px_rgb(var(--voyana-rgb-text-strong)/0.07)] transition duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--voyana-rgb-accent-teal)/0.38)] hover:shadow-[0_24px_60px_rgb(var(--voyana-rgb-text-strong)/0.12)] focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.18)] md:h-80 md:grid-cols-[17rem_minmax(0,1fr)] lg:h-72"
    >
      <div className="relative h-60 min-w-0 overflow-hidden bg-(--voyana-color-background-section) md:h-full">
        <ResponsiveImage
          src={coverImage.url}
          alt={coverImage.alt}
          className="transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgb(var(--voyana-rgb-background-dark)/0)_0%,rgb(var(--voyana-rgb-background-dark)/0.46)_100%)]" />
        <div className="absolute left-3 top-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full bg-[rgb(var(--voyana-rgb-accent-warm)/0.96)] px-3 py-1 text-xs font-black text-(--voyana-color-button-primary-text) shadow-[0_10px_26px_rgb(var(--voyana-rgb-background-dark)/0.16)]">
          <LocalOfferRoundedIcon className="text-[0.95rem]" />
          <span className="truncate">
            {offer.pricing.discountLabel ?? "Curated deal"}
          </span>
        </div>
      </div>

      <div className="grid min-h-0 min-w-0 gap-5 p-4 sm:p-5 md:h-full lg:grid-cols-[minmax(0,1fr)_12rem] lg:gap-6">
        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[rgb(var(--voyana-rgb-accent-teal)/0.11)] px-3 py-1 text-xs font-black uppercase tracking-normal text-(--voyana-color-accent-teal-strong)">
              {offer.type.label}
            </span>
            {duration ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-(--voyana-color-background-section) px-3 py-1 text-xs font-black text-(--voyana-color-text-muted)">
                <CalendarMonthRoundedIcon className="text-[0.95rem]" />
                {duration}
              </span>
            ) : null}
          </div>

          <h2 className="mt-3 line-clamp-2 text-xl font-black leading-tight text-(--voyana-color-text-strong)">
            {offer.name}
          </h2>
          <OfferMetaInfo
            className="mt-3 md:flex-nowrap"
            location={offer.pageMetadata?.pageTitle ?? "Selected destination"}
            rating={offer.rating}
          />
          <p className="mt-4 line-clamp-2 text-sm font-medium leading-6 text-(--voyana-color-text-body)">
            {offer.description}
          </p>
        </div>

        <div className="flex min-w-0 items-end justify-between gap-4 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.82)] pt-4 lg:h-full lg:flex-col lg:items-stretch lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div className="min-w-0 lg:text-right">
            {offer.pricing.originalAmount ? (
              <p className="text-sm font-bold text-(--voyana-color-text-muted) line-through">
                {formatPrice(
                  offer.pricing.originalAmount,
                  offer.pricing.currency,
                )}
              </p>
            ) : null}
            <p className="mt-1 text-2xl font-black leading-none text-(--voyana-color-text-primary)">
              {formatPrice(offer.pricing.amount, offer.pricing.currency)}
            </p>
            {priceUnit ? (
              <p className="mt-1 text-xs font-bold text-(--voyana-color-text-muted)">
                {priceUnit}
              </p>
            ) : null}
          </div>
          <span className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-(--voyana-color-background-dark) px-4 text-sm font-black text-(--voyana-color-white) transition-colors group-hover:bg-(--voyana-color-accent-teal-strong)">
            View deal
            <ArrowForwardRoundedIcon className="text-[1rem]" />
          </span>
        </div>
      </div>
    </RouterLink>
  );
};
