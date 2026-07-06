import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { routes } from "../../../../../app/router/routes";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/hooks";
import { ReviewsSection } from "../../../../reviews";

import {
  fetchOfferById,
  selectOfferById,
  selectOfferByIdError,
  selectOfferByIdRequest,
  selectOfferByIdStatus,
} from "../../../store/offersSlice";
import { OfferDetailsTopBar } from "../../shared/components";
import { AllInclusiveBeachResortAmenities } from "./AllInclusiveBeachResortAmenities";
import { AllInclusiveBeachResortBookingSummary } from "./AllInclusiveBeachResortBookingSummary";
import { AllInclusiveBeachResortDescription } from "./AllInclusiveBeachResortDescription";
import { AllInclusiveBeachResortImageGallery } from "./AllInclusiveBeachResortImageGallery";
import { AllInclusiveBeachResortInformation } from "./AllInclusiveBeachResortInformation";
import {
  allInclusiveBeachResortReviewCategories,
  allInclusiveBeachResortReviews,
  allInclusiveBeachResortReviewSummary,
} from "./content/allInclusiveBeachResortReviews.content";

export const AllInclusiveBeachResortOfferDetails = () => {
  const { offerCode, offerId } = useParams<{
    offerCode: string;
    offerId: string;
  }>();
  const dispatch = useAppDispatch();
  const offer = useAppSelector(selectOfferById);
  const offerStatus = useAppSelector(selectOfferByIdStatus);
  const offerError = useAppSelector(selectOfferByIdError);
  const offerRequest = useAppSelector(selectOfferByIdRequest);
  const currentOffer =
    offer !== null && offer._id === offerId && offer.code === offerCode
      ? offer
      : null;

  useEffect(() => {
    const isCurrentRequest =
      offerRequest !== null &&
      offerRequest.offerId === offerId &&
      offerRequest.offerCode === offerCode;

    if (
      offerId !== undefined &&
      offerCode !== undefined &&
      offerStatus !== "loading" &&
      currentOffer === null &&
      !isCurrentRequest
    ) {
      void dispatch(
        fetchOfferById({
          offerId,
          offerCode,
        }),
      );
    }
  }, [currentOffer, dispatch, offerCode, offerId, offerRequest, offerStatus]);

  const pageTitle = currentOffer?.name ?? "Offer";

  return (
    <>
      <OfferDetailsTopBar
        backLabel="Search"
        backTo={routes.home}
        currentLabel={pageTitle}
      />
      {currentOffer === null ? (
        <div className="grid h-64 w-full place-items-center rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.96)] bg-white text-sm font-medium text-(--voyana-color-text-muted) sm:h-80 md:h-96 xl:h-120">
          {offerStatus === "failed"
            ? (offerError ?? "Offer could not be loaded.")
            : "Loading offer..."}
        </div>
      ) : (
        <AllInclusiveBeachResortImageGallery
          coverImage={currentOffer.media.coverImage}
          galleryImages={currentOffer.media.galleryImages}
        />
      )}
      <div className="grid w-full min-w-0 gap-6 bg-white py-8 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] xl:items-start xl:gap-6">
        <div className="min-w-0 bg-white">
          <AllInclusiveBeachResortDescription
            name={currentOffer?.name}
            description={currentOffer?.description}
          />
          <div className="mt-10 grid gap-6">
            <AllInclusiveBeachResortAmenities
              amenities={currentOffer?.logistics?.amenities}
            />
            <AllInclusiveBeachResortInformation
              stayDetails={currentOffer?.logistics?.stayDetails}
            />
          </div>
        </div>
        <AllInclusiveBeachResortBookingSummary />
      </div>
      <ReviewsSection
        categories={allInclusiveBeachResortReviewCategories}
        description="Verified guest feedback helps travelers understand the resort comfort, all-inclusive service, beach location, and booking experience before choosing a package."
        reviews={allInclusiveBeachResortReviews}
        summary={allInclusiveBeachResortReviewSummary}
        title="Guest reviews"
      />
    </>
  );
};
