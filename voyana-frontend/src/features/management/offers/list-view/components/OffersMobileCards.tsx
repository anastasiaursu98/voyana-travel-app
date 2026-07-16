import { AppSurface, AppTypography } from "../../../../../shared/ui";
import { ManagementActionMenu } from "../../../shared/ManagementActionMenu";
import type { OfferManagementItem } from "../../types/offerManagement.types";
import { OfferStatusBadge } from "./OfferStatusBadge";

type OffersMobileCardsProps = {
  offers: OfferManagementItem[];
};

export function OffersMobileCards({ offers }: OffersMobileCardsProps) {
  return (
    <div className="grid gap-3 p-4 lg:hidden">
      {offers.map((offer) => (
        <AppSurface
          as="article"
          key={offer.id}
          variant="plain"
          className="p-4"
        >
          <div className="flex items-start gap-3">
            <img
              src={offer.imageUrl}
              alt=""
              className="h-16 w-20 shrink-0 rounded-(--voyana-radius-card) object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <AppTypography
                    variant="cardTitle"
                    className="leading-5 text-(--voyana-color-text-strong)"
                  >
                    {offer.name}
                  </AppTypography>
                  <p className="mt-1 text-xs font-bold text-(--voyana-color-text-muted)">
                    {offer.code}
                  </p>
                </div>
                <OfferStatusBadge status={offer.status} />
              </div>
            </div>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.8)] pt-4 text-sm">
            <div>
              <dt className="text-xs font-bold text-(--voyana-color-text-muted)">
                Destination
              </dt>
              <dd className="mt-1 font-black text-(--voyana-color-text-strong)">
                {offer.destination}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold text-(--voyana-color-text-muted)">
                Price
              </dt>
              <dd className="mt-1 font-black text-(--voyana-color-text-strong)">
                {offer.price}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold text-(--voyana-color-text-muted)">
                Travel period
              </dt>
              <dd className="mt-1 font-semibold text-(--voyana-color-text-body)">
                {offer.travelPeriod}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold text-(--voyana-color-text-muted)">
                Availability
              </dt>
              <dd className="mt-1 font-semibold text-(--voyana-color-text-body)">
                {offer.availability}
              </dd>
            </div>
          </dl>
          <div className="mt-4 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.8)] pt-3">
            <ManagementActionMenu itemLabel={offer.name} />
          </div>
        </AppSurface>
      ))}
    </div>
  );
}
