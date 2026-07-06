import {
  OfferDetailList,
  OfferPriceSummary,
} from "../../shared/components";
import type { OfferFact } from "../../../types/offerDetails.types";
import type { Offer } from "../../../types/offer.types";

type OfferDetailsSidebarProps = {
  offer: Offer;
  stayDetails: OfferFact[];
};

export function OfferDetailsSidebar({
  offer,
  stayDetails,
}: OfferDetailsSidebarProps) {
  return (
    <div className="grid gap-6 xl:sticky xl:top-24 xl:self-start">
      <OfferPriceSummary price={offer.pricing} ctaLabel="Check availability">
        <div className="grid gap-2 text-sm font-medium text-(--voyana-color-text-muted)">
          <p>{offer.category.label}</p>
          <p>{offer.type.label}</p>
          {offer.travelPeriod.duration ? <p>{offer.travelPeriod.duration}</p> : null}
        </div>
      </OfferPriceSummary>
      <OfferDetailList
        gridClassName="grid gap-4"
        items={stayDetails}
        title="Stay details"
      />
    </div>
  );
}
