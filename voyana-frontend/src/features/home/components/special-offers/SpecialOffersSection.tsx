import { useEffect } from "react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink } from "react-router-dom";
import { routes } from "../../../../app/router/routes";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";

import { SectionHeader } from "../../../../shared/components/SectionHeader";
import { fetchOffers, selectOffers } from "../../../offers/store/offersSlice";
import { HomeContentContainer } from "../shared/HomeContentContainer";
import { SpecialOffersCarousel } from "./SpecialOffersCarousel";

export function SpecialOffersSection() {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(selectOffers);

  useEffect(() => {
    void dispatch(fetchOffers());
  }, [dispatch]);
  return (
    <section
      id="offers"
      className="relative w-full overflow-hidden border-y border-[rgb(var(--voyana-rgb-border-subtle)/0.72)] bg-(--voyana-color-background-section) pb-16 pt-14 text-(--voyana-color-text-primary) sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgb(var(--voyana-rgb-white)/0.82)_0%,transparent_100%)]"
      />
      <HomeContentContainer>
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Featured offers"
            title="Recommended travel deals"
            description="Handpicked offers with clear prices, trip details, and stay highlights."
            titleSize="large"
            descriptionSize="large"
            titleTransform="none"
          />
          <RouterLink
            to={routes.offers}
            className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full border-2 border-[rgb(var(--voyana-rgb-text-strong)/0.28)] bg-transparent px-6 text-sm font-black text-(--voyana-color-text-strong) no-underline transition hover:-translate-y-0.5 hover:border-[rgb(var(--voyana-rgb-text-strong)/0.52)] focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-text-strong)/0.14)]"
          >
            View all offers
            <ArrowForwardRoundedIcon fontSize="small" />
          </RouterLink>
        </div>
        <SpecialOffersCarousel offers={offers} />
      </HomeContentContainer>
    </section>
  );
}
