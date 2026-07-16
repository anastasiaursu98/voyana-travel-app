import { AppButton } from "../../../../shared/ui";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type Variants,
} from "framer-motion";
import type { DashboardDestination } from "../../../destinations/types/destination.types";
import { HeroCarouselCard } from "./HeroCarouselCard";

const VISIBLE_CARDS_COUNT = 3;

type CarouselCardMotionState = {
  direction: 1 | -1;
  position: number;
};

const cardMotionByPosition = [
  { y: 0, scale: 1, opacity: 1, brightness: 1 },
  { y: 18, scale: 0.92, opacity: 0.94, brightness: 0.9 },
  { y: 32, scale: 0.86, opacity: 0.82, brightness: 0.82 },
] as const;

const getCardMotionState = (position: number) =>
  cardMotionByPosition[position] ??
  cardMotionByPosition[cardMotionByPosition.length - 1];

const getCardVisibilityClass = (position: number) => {
  if (position >= 2) {
    return "hidden xl:block";
  }

  return "";
};

const carouselCardVariants: Variants = {
  enter: ({ direction, position }: CarouselCardMotionState) => ({
    x: direction === 1 ? -170 : 170,
    y: getCardMotionState(position).y + 26,
    scale: 0.82,
    opacity: 0,
    filter: "brightness(0.78)",
  }),
  center: ({ position }: CarouselCardMotionState) => {
    const motionState = getCardMotionState(position);

    return {
      x: 0,
      y: motionState.y,
      scale: motionState.scale,
      opacity: motionState.opacity,
      filter: `brightness(${motionState.brightness})`,
    };
  },
  exit: ({ direction }: CarouselCardMotionState) => ({
    x: direction === 1 ? 170 : -170,
    y: -12,
    scale: 0.9,
    opacity: 0,
    filter: "brightness(0.78)",
  }),
};

const carouselCardTransition = {
  type: "spring",
  stiffness: 118,
  damping: 19,
  mass: 0.88,
} as const;

const carouselTrackTransition = {
  type: "spring",
  stiffness: 96,
  damping: 18,
  mass: 0.92,
} as const;

type HeroCarouselProps = {
  destinations: readonly DashboardDestination[];
  currentDestinationIndex: number;
  carouselDirection: 1 | -1;
  galleryImageIndexByDestinationId: Record<string, number>;
  onGalleryImageClick: (
    destination: DashboardDestination,
    selectedGalleryImageIndex: number,
  ) => void;
  onGoNext: () => void;
  onGoPrevious: () => void;
};

export function HeroCarousel({
  destinations,
  currentDestinationIndex,
  carouselDirection,
  galleryImageIndexByDestinationId,
  onGalleryImageClick,
  onGoNext,
  onGoPrevious,
}: HeroCarouselProps) {
  const orderedDestinations =
    currentDestinationIndex === 0
      ? destinations
      : [
          ...destinations.slice(currentDestinationIndex),
          ...destinations.slice(0, currentDestinationIndex),
        ];
  const visibleDestinations = orderedDestinations.slice(
    0,
    VISIBLE_CARDS_COUNT,
  );

  return (
    <div className="pointer-events-auto relative flex w-full min-w-0 flex-col overflow-visible bg-transparent">
      <div className="min-w-0 overflow-visible pb-2 pt-0 sm:pb-3 md:pb-4">
        <LayoutGroup id="hero-destination-carousel">
          <motion.div
            layout
            className="flex min-w-0 items-end justify-start gap-3 xl:gap-4"
            transition={carouselTrackTransition}
          >
            <AnimatePresence custom={carouselDirection} initial={false}>
              {visibleDestinations.map((currentDestination, position) => {
                return (
                  <motion.div
                    key={currentDestination._id}
                    layout
                    custom={{ direction: carouselDirection, position }}
                    variants={carouselCardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={`shrink-0 will-change-transform ${getCardVisibilityClass(position)}`}
                    style={{
                      zIndex: VISIBLE_CARDS_COUNT - position,
                      transformOrigin: "bottom center",
                    }}
                    transition={carouselCardTransition}
                  >
                    <HeroCarouselCard
                      destination={currentDestination}
                      galleryImageIndexByDestinationId={
                        galleryImageIndexByDestinationId
                      }
                      onGalleryImageClick={onGalleryImageClick}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
      <div className="sr-only">
        <AppButton intent="control"
          type="button"
          aria-label="Previous destinations"
          onClick={onGoPrevious}
        >
          Previous destinations
        </AppButton>
        <AppButton intent="control"
          type="button"
          aria-label="Next destinations"
          onClick={onGoNext}
        >
          Next destinations
        </AppButton>
      </div>
    </div>
  );
}
