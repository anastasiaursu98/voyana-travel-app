import { useEffect, useState } from "react";
import type { DashboardDestination } from "../../destinations/types/destination.types";

const CAROUSEL_AUTOPLAY_INTERVAL_MS = 4200;

const getSafeDestinationIndex = (
  destinationIndex: number,
  destinationsCount: number,
) => {
  if (destinationsCount === 0) {
    return 0;
  }

  return Math.min(destinationIndex, destinationsCount - 1);
};

export function useHeroCarousel(destinations: readonly DashboardDestination[]) {
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [carouselDirection, setCarouselDirection] = useState<1 | -1>(1);
  const [autoplayResetKey, setAutoplayResetKey] = useState(0);
  const [
    galleryImageIndexByDestinationId,
    setGalleryImageIndexByDestinationId,
  ] = useState<Record<string, number>>({});

  const resetAutoplayTimer = () => {
    setAutoplayResetKey((currentKey) => currentKey + 1);
  };

  const handleGalleryImageClick = (
    currentDestination: DashboardDestination,
    selectedGalleryImageIndex: number,
  ) => {
    const galleryImagesCount = currentDestination.galleryImages.length;
    if (galleryImagesCount === 0) {
      return;
    }
    const destinationId = currentDestination._id;

    setGalleryImageIndexByDestinationId((previousGalleryImageIndexes) => ({
      ...previousGalleryImageIndexes,
      [destinationId]: selectedGalleryImageIndex,
    }));
    resetAutoplayTimer();
  };

  useEffect(() => {
    if (destinations.length <= 1) {
      return undefined;
    }

    const autoplayTimer = window.setInterval(() => {
      setCarouselDirection(1);
      setCurrentDestinationIndex((previousIndex) => {
        const safePreviousIndex = getSafeDestinationIndex(
          previousIndex,
          destinations.length,
        );
        const nextIndex = safePreviousIndex + 1;
        return nextIndex >= destinations.length ? 0 : nextIndex;
      });
    }, CAROUSEL_AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(autoplayTimer);
  }, [autoplayResetKey, destinations.length]);

  const handleGoNext = () => {
    if (destinations.length === 0) {
      return;
    }

    setCarouselDirection(1);
    setCurrentDestinationIndex((previousIndex) => {
      const safePreviousIndex = getSafeDestinationIndex(
        previousIndex,
        destinations.length,
      );
      const nextIndex = safePreviousIndex + 1;
      return nextIndex >= destinations.length ? 0 : nextIndex;
    });
    resetAutoplayTimer();
  };
  const handleGoPrevious = () => {
    if (destinations.length === 0) {
      return;
    }

    setCarouselDirection(-1);
    setCurrentDestinationIndex((previousIndex) => {
      const safePreviousIndex = getSafeDestinationIndex(
        previousIndex,
        destinations.length,
      );
      const previousDestinationIndex = safePreviousIndex - 1;
      return previousDestinationIndex < 0
        ? destinations.length - 1
        : previousDestinationIndex;
    });
    resetAutoplayTimer();
  };

  return {
    galleryImageIndexByDestinationId,
    currentDestinationIndex: getSafeDestinationIndex(
      currentDestinationIndex,
      destinations.length,
    ),
    carouselDirection,
    handleGalleryImageClick,
    handleGoNext,
    handleGoPrevious,
  };
}
