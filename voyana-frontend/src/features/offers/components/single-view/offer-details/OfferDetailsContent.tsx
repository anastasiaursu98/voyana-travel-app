import {
  OfferDescription,
  OfferDetailList,
} from "../../shared/components";
import type { OfferFact } from "../../../types/offerDetails.types";
import type { Offer } from "../../../types/offer.types";

type OfferDetailsContentProps = {
  amenities: OfferFact[];
  offer: Offer;
  offerFacts: OfferFact[];
};

export function OfferDetailsContent({
  amenities,
  offer,
  offerFacts,
}: OfferDetailsContentProps) {
  return (
    <div className="min-w-0">
      <OfferDescription
        description={offer.description}
        location={offer.pageMetadata?.pageTitle ?? offer.category.label}
        rating={offer.rating}
        title={offer.name}
      />
      <div className="mt-10 grid gap-6">
        <OfferDetailList
          gridClassName="grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3"
          items={offerFacts}
          title="Offer details"
        />
        <OfferDetailList
          gridClassName="grid gap-x-8 gap-y-4 sm:grid-cols-2"
          items={amenities}
          title="Included services"
        />
      </div>
    </div>
  );
}
