import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/hooks";
import type { OfferFact } from "../../../types/offerDetails.types";
import type { Offer } from "../../../types/offer.types";
import {
  fetchOfferById,
  selectOfferById,
  selectOfferByIdError,
  selectOfferByIdRequest,
  selectOfferByIdStatus,
} from "../../../store/offersSlice";

const formatTravelDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const buildOfferFacts = (offer: Offer | null): OfferFact[] => {
  if (!offer) {
    return [];
  }

  return [
    {
      icon: "check",
      id: "category",
      label: "Category",
      value: offer.category.label,
    },
    {
      icon: "activity",
      id: "type",
      label: "Offer type",
      value: offer.type.label,
    },
    ...(offer.travelPeriod.duration
      ? [
          {
            icon: "calendar" as const,
            id: "duration",
            label: "Duration",
            value: offer.travelPeriod.duration,
          },
        ]
      : []),
    {
      icon: "calendar",
      id: "start-date",
      label: "Start date",
      value: formatTravelDate(offer.travelPeriod.startDate),
    },
    {
      icon: "calendar",
      id: "end-date",
      label: "End date",
      value: formatTravelDate(offer.travelPeriod.endDate),
    },
  ];
};

export function useOfferDetails() {
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
  const offerFacts = useMemo(() => buildOfferFacts(currentOffer), [currentOffer]);

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
      void dispatch(fetchOfferById({ offerCode, offerId }));
    }
  }, [currentOffer, dispatch, offerCode, offerId, offerRequest, offerStatus]);

  return {
    currentOffer,
    offerError,
    offerFacts,
    offerStatus,
  };
}
