import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CardTravelRoundedIcon from "@mui/icons-material/CardTravelRounded";
import { Link as RouterLink } from "react-router-dom";
import { ResponsiveImage } from "../../../../shared/components/ResponsiveImage";
import type { VacationPackage } from "../../types/vacationPackage.types";
import { getVacationPackageDetailsPath } from "../../utils/getVacationPackageDetailsPath";
import { VacationPackageMetaInfo } from "../shared/components";

interface Props {
  vacationPackage: VacationPackage;
}

const formatPrice = (amount: number, currency: VacationPackage["pricing"]["currency"]) =>
  new Intl.NumberFormat("en-US", {
    currency,
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);

export const VacationPackageCard = ({ vacationPackage }: Props) => {
  const coverImage = vacationPackage.media.coverImage;
  const vacationPackagePath = getVacationPackageDetailsPath(vacationPackage);
  const duration = vacationPackage.travelPeriod.duration;
  const priceUnit = vacationPackage.pricing.unit ? `/${vacationPackage.pricing.unit}` : "";
  const campaignLabel =
    vacationPackage.commercial?.campaignLabel ??
    vacationPackage.pricing.discountLabel ??
    "Curated deal";

  return (
    <RouterLink
      to={vacationPackagePath}
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
          <CardTravelRoundedIcon className="text-[0.95rem]" />
          <span className="truncate">{campaignLabel}</span>
        </div>
      </div>

      <div className="grid min-h-0 min-w-0 gap-5 p-4 sm:p-5 md:h-full lg:grid-cols-[minmax(0,1fr)_12rem] lg:gap-6">
        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[rgb(var(--voyana-rgb-accent-teal)/0.11)] px-3 py-1 text-xs font-black uppercase tracking-normal text-(--voyana-color-accent-teal-strong)">
              {vacationPackage.category.label}
            </span>
            {duration ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-(--voyana-color-background-section) px-3 py-1 text-xs font-black text-(--voyana-color-text-muted)">
                <CalendarMonthRoundedIcon className="text-[0.95rem]" />
                {duration}
              </span>
            ) : null}
          </div>

          <h2 className="mt-3 line-clamp-2 text-xl font-black leading-tight text-(--voyana-color-text-strong)">
            {vacationPackage.name}
          </h2>
          <VacationPackageMetaInfo
            className="mt-3 md:flex-nowrap"
            location={vacationPackage.pageMetadata?.pageTitle ?? "Selected destination"}
            rating={vacationPackage.rating}
          />
          <p className="mt-4 line-clamp-2 text-sm font-medium leading-6 text-(--voyana-color-text-body)">
            {vacationPackage.description}
          </p>
        </div>

        <div className="flex min-w-0 items-end justify-between gap-4 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.82)] pt-4 lg:h-full lg:flex-col lg:items-stretch lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div className="min-w-0 lg:text-right">
            {vacationPackage.pricing.originalAmount ? (
              <p className="text-sm font-bold text-(--voyana-color-text-muted) line-through">
                {formatPrice(
                  vacationPackage.pricing.originalAmount,
                  vacationPackage.pricing.currency,
                )}
              </p>
            ) : null}
            <p className="mt-1 text-2xl font-black leading-none text-(--voyana-color-text-primary)">
              {formatPrice(vacationPackage.pricing.amount, vacationPackage.pricing.currency)}
            </p>
            {priceUnit ? (
              <p className="mt-1 text-xs font-bold text-(--voyana-color-text-muted)">
                {priceUnit}
              </p>
            ) : null}
          </div>
          <span className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-(--voyana-color-background-dark) px-4 text-sm font-black text-(--voyana-color-white) transition-colors group-hover:bg-(--voyana-color-accent-teal-strong)">
            View package
            <ArrowForwardRoundedIcon className="text-[1rem]" />
          </span>
        </div>
      </div>
    </RouterLink>
  );
};
