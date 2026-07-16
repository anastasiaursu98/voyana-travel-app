import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import {
  fetchDestinations,
  selectDestinations,
  selectDestinationsStatus,
} from "../../../destinations/store/destinationsSlice";
import { HomeContentContainer } from "../shared/HomeContentContainer";
import { useHeroCarousel } from "../../hooks/useDestinationGallery";
import { HeroBackground } from "./HeroBackground";
import { HeroCarousel } from "./HeroCarousel";
import { HeroIntro } from "./HeroIntro";
import { HeroSearchCard } from "./hero-search-card";

export function HeroSection() {
  const dispatch = useAppDispatch();
  const destinations = useAppSelector(selectDestinations);
  const destinationsStatus = useAppSelector(selectDestinationsStatus);
  const {
    galleryImageIndexByDestinationId,
    currentDestinationIndex,
    carouselDirection,
    handleGalleryImageClick,
    handleGoNext,
    handleGoPrevious,
  } = useHeroCarousel(destinations);

  useEffect(() => {
    if (destinationsStatus === "idle") {
      void dispatch(fetchDestinations());
    }
  }, [destinationsStatus, dispatch]);

  const firstDestination = destinations[0];

  if (!firstDestination) {
    return (
      <section
        id="home"
        className="relative z-50 min-h-screen w-full overflow-visible bg-(--voyana-color-background-dark) text-(--voyana-color-white)"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(110deg,rgb(var(--voyana-rgb-hero-warm)/0.78)_0%,rgb(var(--voyana-rgb-hero-warm)/0.58)_36%,rgb(var(--voyana-rgb-accent-teal-strong)/0.36)_58%,rgb(var(--voyana-rgb-background-dark)/0.46)_100%)]"
        />
        <HomeContentContainer className="relative z-20 flex min-h-0 items-center pb-8 pt-24 sm:pt-28 md:pb-12 lg:min-h-screen lg:pb-52 xl:pb-56 xl:pt-24">
          <div className="w-full max-w-152">
            <HeroIntro />
          </div>
        </HomeContentContainer>
        <HeroSearchCard />
      </section>
    );
  }

  const activeDestination =
    destinations[currentDestinationIndex] ?? firstDestination;

  return (
    <section
      id="home"
      className="relative z-50 min-h-screen w-full overflow-visible bg-(--voyana-color-background-dark)"
    >
      <div className="absolute inset-0 overflow-hidden">
        <HeroBackground imageUrl={activeDestination.coverImage.url} />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[linear-gradient(100deg,rgb(var(--voyana-rgb-hero-warm)/0.76)_0%,rgb(var(--voyana-rgb-hero-warm)/0.58)_33%,rgb(var(--voyana-rgb-accent-teal-strong)/0.26)_49%,rgb(var(--voyana-rgb-background-dark)/0.06)_68%,rgb(var(--voyana-rgb-background-dark)/0.2)_100%)]"
      />

      <HomeContentContainer className="relative z-20 grid min-h-0 min-w-0 gap-4 pb-8 pt-24 sm:gap-5 sm:pb-10 sm:pt-28 md:gap-6 md:pb-12 lg:min-h-screen lg:pb-52 xl:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] xl:content-center xl:items-start xl:gap-16 xl:pb-56 xl:pt-24">
        <div className="flex w-full max-w-152 min-w-0 flex-col justify-center xl:max-w-none">
          <HeroIntro />
        </div>

        <div className="w-full max-w-full min-w-0 sm:max-w-114 xl:max-w-none xl:self-start">
          <div className="relative z-10 w-full max-w-full min-w-0 xl:ml-auto xl:max-w-184">
            <HeroCarousel
              destinations={destinations}
              currentDestinationIndex={currentDestinationIndex}
              carouselDirection={carouselDirection}
              galleryImageIndexByDestinationId={
                galleryImageIndexByDestinationId
              }
              onGalleryImageClick={handleGalleryImageClick}
              onGoNext={handleGoNext}
              onGoPrevious={handleGoPrevious}
            />
          </div>
        </div>
      </HomeContentContainer>
      <HeroSearchCard />
    </section>
  );
}
