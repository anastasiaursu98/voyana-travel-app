import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type Variants,
} from "framer-motion";
import { useLoopedCarousel } from "../../hooks/useLoopedCarousel";

import type { VacationPackage } from "../../../vacation-packages";
import { IconCircleButton } from "../shared/IconCircleButton";
import { SpecialVacationPackageCard } from "./SpecialVacationPackageCard";

const VISIBLE_PACKAGES_COUNT = 4;
const PACKAGE_CARD_LABELS = [
  "Best value",
  "Family friendly",
  "All inclusive",
  "Limited availability",
  "Luxury pick",
  "Last minute",
] as const;

type VacationPackageCardMotionState = {
  direction: 1 | -1;
  position: number;
};

const getVacationPackageVisibilityClass = (position: number) => {
  if (position >= 3) {
    return "hidden xl:block";
  }

  if (position >= 2) {
    return "hidden lg:block";
  }

  if (position >= 1) {
    return "hidden sm:block";
  }

  return "";
};

const vacationPackageCardVariants: Variants = {
  enter: ({ direction }: VacationPackageCardMotionState) => ({
    x: direction === 1 ? 120 : -120,
    scale: 0.96,
    opacity: 0,
    filter: "brightness(0.94)",
  }),
  center: ({ position }: VacationPackageCardMotionState) => ({
    x: 0,
    scale: 1,
    opacity: 1,
    filter: "brightness(1)",
    transition: {
      delay: position * 0.04,
      type: "spring",
      stiffness: 112,
      damping: 20,
      mass: 0.9,
    },
  }),
  exit: ({ direction }: VacationPackageCardMotionState) => ({
    x: direction === 1 ? -120 : 120,
    scale: 0.96,
    opacity: 0,
    filter: "brightness(0.94)",
  }),
};

const carouselCardTransition = {
  type: "spring",
  stiffness: 112,
  damping: 20,
  mass: 0.9,
} as const;

const carouselTrackTransition = {
  type: "spring",
  stiffness: 92,
  damping: 18,
  mass: 0.92,
} as const;

type SpecialVacationPackagesCarouselProps = {
  vacationPackages: readonly VacationPackage[];
};

export function SpecialVacationPackagesCarousel({
  vacationPackages,
}: SpecialVacationPackagesCarouselProps) {
  const {
    direction: carouselDirection,
    goNext,
    goPrevious,
    hasMultipleItems,
    visibleItems: visibleVacationPackages,
  } = useLoopedCarousel(vacationPackages, VISIBLE_PACKAGES_COUNT);

  return (
    <div>
      <div className="mb-5 mt-8 flex items-center justify-end gap-3">
        <IconCircleButton
          aria-label="Previous featured packages"
          disabled={!hasMultipleItems}
          onClick={goPrevious}
        >
          <ArrowBackRoundedIcon fontSize="small" />
        </IconCircleButton>
        <IconCircleButton
          aria-label="Next featured packages"
          disabled={!hasMultipleItems}
          onClick={goNext}
          tone="dark"
        >
          <ArrowForwardRoundedIcon fontSize="small" />
        </IconCircleButton>
      </div>

      <LayoutGroup id="special-vacation-packages-carousel">
        <motion.ul
          layout
          aria-label="Featured vacation packages carousel"
          className="grid min-w-0 grid-cols-1 gap-5 overflow-hidden pb-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
          transition={carouselTrackTransition}
        >
          <AnimatePresence
            custom={carouselDirection}
            initial={false}
            mode="popLayout"
          >
            {visibleVacationPackages.map((vacationPackage, position) => (
              <motion.li
                key={vacationPackage._id}
                layout
                custom={{ direction: carouselDirection, position }}
                variants={vacationPackageCardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`min-w-0 will-change-transform ${getVacationPackageVisibilityClass(position)}`}
                transition={carouselCardTransition}
              >
                <SpecialVacationPackageCard
                  vacationPackage={vacationPackage}
                  vacationPackageLabel={
                    PACKAGE_CARD_LABELS[position % PACKAGE_CARD_LABELS.length]
                  }
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </div>
  );
}
