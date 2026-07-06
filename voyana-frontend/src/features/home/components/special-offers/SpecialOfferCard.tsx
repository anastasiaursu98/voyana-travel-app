import { generatePath, Link as RouterLink } from "react-router-dom";
import { routes } from "../../../../app/router/routes";
import { ResponsiveImage } from "../../../../shared/components/ResponsiveImage";
import type { Offer } from "../../../offers/types/offer.types";
import { OnboardingPill } from "../shared/OnboardingPill";

interface SpecialOfferCardProps {
  offer: Offer;
}

const formatPrice = (amount: number, currency: Offer["pricing"]["currency"]) =>
  new Intl.NumberFormat("en-US", {
    currency,
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);

const getOfferPills = (offer: Offer) => {
  const pills = [
    offer.type.label,
    offer.category.label,
    offer.travelPeriod.duration,
  ].filter((item): item is string => Boolean(item));

  return pills.length > 0
    ? pills.slice(0, 3)
    : ["Resort", "All inclusive", "Transfer"];
};

const getOfferDetailsPath = (offer: Offer) => {
  return generatePath(routes.offerDetails, {
    offerCode: offer.code,
    offerId: offer._id,
  });
};

export function SpecialOfferCard({ offer }: SpecialOfferCardProps) {
  const estimatedSavings =
    offer.pricing.originalAmount !== undefined
      ? Math.max(0, offer.pricing.originalAmount - offer.pricing.amount)
      : Math.max(120, Math.round(offer.pricing.amount * 0.18));
  const includedServices = getOfferPills(offer);
  const coverImage = offer.media.coverImage;
  const offerPath = getOfferDetailsPath(offer);

  return (
    <RouterLink
      to={offerPath}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.92)] bg-(--voyana-color-white) no-underline shadow-[0_18px_45px_rgb(var(--voyana-rgb-text-strong)/0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgb(var(--voyana-rgb-text-strong)/0.14)] focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.18)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <ResponsiveImage
          src={coverImage.url}
          alt={coverImage.alt}
          className="transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 rounded-full bg-[rgb(var(--voyana-rgb-accent-warm)/0.94)] px-3 py-1 text-xs font-black tracking-normal text-(--voyana-color-button-primary-text) shadow-[0_10px_26px_rgb(var(--voyana-rgb-background-dark)/0.2)]">
          {offer.pricing.discountLabel ?? "Featured"}
        </div>
        <div className="absolute bottom-3 left-3 rounded-full bg-[rgb(var(--voyana-rgb-background-dark)/0.78)] px-3 py-1 text-xs font-black text-(--voyana-color-white) backdrop-blur-md">
          Save {formatPrice(estimatedSavings, offer.pricing.currency)}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="min-w-0">
          <h3 className="text-lg font-black leading-tight text-(--voyana-color-text-strong)">
            {offer.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[rgb(var(--voyana-rgb-text-muted)/0.94)]">
            {offer.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {includedServices.map((service) => (
              <OnboardingPill key={service}>{service}</OnboardingPill>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.78)] pt-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-normal text-[rgb(var(--voyana-rgb-text-muted)/0.78)]">
              From
            </p>
            <p className="text-2xl font-black leading-none text-(--voyana-color-text-strong)">
              {formatPrice(offer.pricing.amount, offer.pricing.currency)}
            </p>
            {offer.pricing.unit ? (
              <p className="mt-1 text-xs font-bold text-[rgb(var(--voyana-rgb-text-muted)/0.72)]">
                /{offer.pricing.unit}
              </p>
            ) : null}
          </div>
          <OnboardingPill tone="teal" className="py-1">
            Offer
          </OnboardingPill>
        </div>
      </div>
    </RouterLink>
  );
}
