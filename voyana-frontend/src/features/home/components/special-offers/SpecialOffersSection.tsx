import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";

import { SectionHeader } from "../../../../shared/components/SectionHeader";
import {
  fetchOffers,
  selectOffers,
  selectOffersStatus,
} from "../../../offers/store/offersSlice";
import { HomeContentContainer } from "../shared/HomeContentContainer";
import { SpecialOffersCarousel } from "./SpecialOffersCarousel";

export function SpecialOffersSection() {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(selectOffers);
  const offersStatus = useAppSelector(selectOffersStatus);

  useEffect(() => {
    if (offersStatus === "idle") {
      void dispatch(fetchOffers());
    }
  }, [offersStatus, dispatch]);
  return (
    <section
      id="offers"
      className="relative w-full overflow-hidden bg-(--voyana-color-background-section) pb-16 pt-14 text-(--voyana-color-text-primary) sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
    >
      <HomeContentContainer>
        <SectionHeader
          eyebrow="Featured offers"
          title="Current travel deals"
          description="Handpicked offers now follow the new categories: beach holidays, city breaks, family trips, luxury stays, adventure travel, and seasonal deals."
          titleSize="large"
          descriptionSize="large"
          titleTransform="none"
        />
        <SpecialOffersCarousel offers={offers} />
      </HomeContentContainer>
    </section>
  );
}
