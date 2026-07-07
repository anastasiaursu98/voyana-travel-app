import { useVacationPackageDetailsViewModel } from "../../../hooks/useVacationPackageDetailsViewModel";
import { VacationPackageDetailsTopBar } from "../../shared/components";
import { VacationPackageDetailsTemplateContent } from "./VacationPackageDetailsTemplate";
import { VacationPackageDetailsContent } from "./VacationPackageDetailsContent";
import { VacationPackageDetailsImageGallery } from "./VacationPackageDetailsImageGallery";
import { VacationPackageDetailsSidebar } from "./VacationPackageDetailsSidebar";
import type { VacationPackage } from "../../../types/vacationPackage.types";
import type {
  VacationPackageDetailsMainSection,
  VacationPackageDetailsSidebarSection,
} from "../../../types/vacationPackageDetailsSections.types";

type VacationPackageDetailsProps = {
  ctaLabel?: string;
  mainSections?: VacationPackageDetailsMainSection[];
  sidebarSections?: VacationPackageDetailsSidebarSection[];
};

const BEACH_PACKAGE_MAIN_SECTIONS: VacationPackageDetailsMainSection[] = [
  "description",
  "details",
  "stayDetails",
  "includedServices",
];

const TOUR_PACKAGE_MAIN_SECTIONS: VacationPackageDetailsMainSection[] = [
  "description",
  "details",
  "stayDetails",
];

type VacationPackageDetailsBodyProps = {
  amenities: ReturnType<typeof useVacationPackageDetailsViewModel>["amenities"];
  ctaLabel?: string;
  mainSections: VacationPackageDetailsMainSection[];
  sidebarSections: VacationPackageDetailsSidebarSection[];
  stayDetails: ReturnType<typeof useVacationPackageDetailsViewModel>["stayDetails"];
  vacationPackage: VacationPackage;
  vacationPackageFacts: ReturnType<
    typeof useVacationPackageDetailsViewModel
  >["vacationPackageFacts"];
};

function VacationPackageDetailsBody({
  amenities,
  ctaLabel,
  mainSections,
  sidebarSections,
  stayDetails,
  vacationPackage,
  vacationPackageFacts,
}: VacationPackageDetailsBodyProps) {
  const packageCategory = vacationPackage.category.value;
  const resolvedCtaLabel =
    ctaLabel ??
    (packageCategory === "TOURS_AND_ITINERARIES"
      ? "Request tour"
      : "Check availability");
  const resolvedMainSections =
    packageCategory === "BEACH_HOLIDAYS"
      ? BEACH_PACKAGE_MAIN_SECTIONS
      : packageCategory === "TOURS_AND_ITINERARIES"
        ? TOUR_PACKAGE_MAIN_SECTIONS
        : mainSections;

  return (
    <>
      <VacationPackageDetailsImageGallery
        coverImage={vacationPackage.media.coverImage}
        galleryImages={vacationPackage.media.galleryImages}
      />
      <div className="grid w-full min-w-0 gap-6 bg-white py-8 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] xl:items-start xl:gap-6">
        <VacationPackageDetailsContent
          amenities={amenities}
          vacationPackage={vacationPackage}
          vacationPackageFacts={vacationPackageFacts}
          sections={resolvedMainSections}
          stayDetails={stayDetails}
        />
        <VacationPackageDetailsSidebar
          ctaLabel={resolvedCtaLabel}
          vacationPackage={vacationPackage}
          sections={sidebarSections}
        />
      </div>
      <VacationPackageDetailsTemplateContent
        vacationPackage={vacationPackage}
      />
    </>
  );
}

export function VacationPackageDetails({
  ctaLabel,
  mainSections = ["description", "details", "stayDetails", "includedServices"],
  sidebarSections = ["priceSummary"],
}: VacationPackageDetailsProps) {
  const {
    amenities,
    backLabel,
    backTo,
    currentVacationPackage,
    isLoading,
    loadingMessage,
    vacationPackageFacts,
    pageTitle,
    stayDetails,
  } = useVacationPackageDetailsViewModel({
    mainSections,
  });

  return (
    <>
      <VacationPackageDetailsTopBar
        backLabel={backLabel}
        backTo={backTo}
        currentLabel={pageTitle}
      />

      {isLoading || currentVacationPackage === null ? (
        <div className="grid h-64 w-full place-items-center rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.96)] bg-white text-sm font-medium text-(--voyana-color-text-muted) sm:h-80 md:h-96 xl:h-120">
          {loadingMessage}
        </div>
      ) : (
        <VacationPackageDetailsBody
          amenities={amenities}
          ctaLabel={ctaLabel}
          mainSections={mainSections}
          sidebarSections={sidebarSections}
          stayDetails={stayDetails}
          vacationPackage={currentVacationPackage}
          vacationPackageFacts={vacationPackageFacts}
        />
      )}
    </>
  );
}
