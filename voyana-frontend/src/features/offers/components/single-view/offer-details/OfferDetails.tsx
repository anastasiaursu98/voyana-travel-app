import { routes } from "../../../../../app/router/routes";
import {
  OfferDetailsTopBar,
} from "../../shared/components";
import { OfferDetailsContent } from "./OfferDetailsContent";
import { OfferDetailsImageGallery } from "./OfferDetailsImageGallery";
import { OfferDetailsSidebar } from "./OfferDetailsSidebar";
import { useOfferDetails } from "./useOfferDetails";

export function OfferDetails() {
  const { currentOffer, offerError, offerFacts, offerStatus } =
    useOfferDetails();
  const pageTitle = currentOffer?.name ?? "Offer";

  return (
    <>
      <OfferDetailsTopBar
        backLabel="Offers"
        backTo={routes.offers}
        currentLabel={pageTitle}
      />

      {currentOffer === null ? (
        <div className="grid h-64 w-full place-items-center rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.96)] bg-white text-sm font-medium text-(--voyana-color-text-muted) sm:h-80 md:h-96 xl:h-120">
          {offerStatus === "failed"
            ? (offerError ?? "Offer could not be loaded.")
            : "Loading offer..."}
        </div>
      ) : (
        <>
          <OfferDetailsImageGallery
            coverImage={currentOffer.media.coverImage}
            galleryImages={currentOffer.media.galleryImages}
          />
          <div className="grid w-full min-w-0 gap-6 bg-white py-8 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] xl:items-start xl:gap-6">
            <OfferDetailsContent
              amenities={currentOffer.logistics?.amenities ?? []}
              offer={currentOffer}
              offerFacts={offerFacts}
            />
            <OfferDetailsSidebar
              offer={currentOffer}
              stayDetails={currentOffer.logistics?.stayDetails ?? []}
            />
          </div>
        </>
      )}
    </>
  );
}
