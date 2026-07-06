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
import { AllInclusiveAmenities } from "./AllInclusiveAmenities";
import { AllInclusiveBookingSummary } from "./AllInclusiveBookingSummary";
import { AllInclusiveDescription } from "./AllInclusiveDescription";
import { AllInclusiveImageGallery } from "./AllInclusiveImageGallery";
import { AllInclusiveInformation } from "./AllInclusiveInformation";
import {
  allInclusiveReviewCategories,
  allInclusiveReviews,
  allInclusiveReviewSummary,
} from "./content/allInclusiveReviews.content";

export const AllInclusiveOfferDetails = () => {
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
        <AllInclusiveImageGallery
          coverImage={currentOffer.media.coverImage}
          galleryImages={currentOffer.media.galleryImages}
        />
      )}
      <div className="grid w-full min-w-0 gap-6 bg-white py-8 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] xl:items-start xl:gap-6">
        <div className="min-w-0 bg-white">
          <AllInclusiveDescription
            name={currentOffer?.name}
            description={currentOffer?.description}
          />
          <div className="mt-10 grid gap-6">
            <AllInclusiveAmenities
              amenities={currentOffer?.logistics?.amenities}
            />
            <AllInclusiveInformation
              stayDetails={currentOffer?.logistics?.stayDetails}
            />
          </div>
        </div>
        <AllInclusiveBookingSummary />
      </div>
      <ReviewsSection
        categories={allInclusiveReviewCategories}
        description="Verified guest feedback helps travelers understand the resort comfort, all-inclusive service, beach location, and booking experience before choosing a package."
        reviews={allInclusiveReviews}
        summary={allInclusiveReviewSummary}
        title="Guest reviews"
      />
    </>
  );
};
