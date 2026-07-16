import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { routes } from "../../../../app/router/routes";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";

import { SectionHeader } from "../../../../shared/components/SectionHeader";
import { AppButton } from "../../../../shared/ui";
import {
  fetchVacationPackages,
  selectVacationPackages,
} from "../../../vacation-packages";
import { HomeContentContainer } from "../shared/HomeContentContainer";
import { SpecialVacationPackagesCarousel } from "./SpecialVacationPackagesCarousel";

export function SpecialVacationPackagesSection() {
  const dispatch = useAppDispatch();
  const vacationPackages = useAppSelector(selectVacationPackages);

  useEffect(() => {
    void dispatch(fetchVacationPackages());
  }, [dispatch]);
  return (
    <section
      id="vacation-packages"
      className="relative w-full overflow-hidden border-y border-[rgb(var(--voyana-rgb-border-subtle)/0.72)] bg-(--voyana-color-background-section) pb-16 pt-14 text-(--voyana-color-text-primary) sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgb(var(--voyana-rgb-white)/0.82)_0%,transparent_100%)]"
      />
      <HomeContentContainer>
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Featured packages"
            title="Recommended vacation packages"
            description="Handpicked vacation packages with clear prices, trip details, and stay highlights."
            titleSize="default"
            descriptionSize="large"
            titleTransform="none"
          />
          <AppButton
            component={RouterLink}
            intent="secondary"
            surface="light"
            to={routes.vacationPackages}
            className="w-fit"
            endIcon={<ArrowForwardRoundedIcon fontSize="small" />}
          >
            View all packages
          </AppButton>
        </div>
        <SpecialVacationPackagesCarousel vacationPackages={vacationPackages} />
      </HomeContentContainer>
    </section>
  );
}
