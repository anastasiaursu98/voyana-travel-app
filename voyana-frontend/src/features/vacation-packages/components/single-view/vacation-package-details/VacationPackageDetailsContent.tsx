import {
  VacationPackageDescription,
  VacationPackageDetailList,
} from "../../shared/components";
import type { VacationPackageFact } from "../../../types/vacationPackageDetails.types";
import type { VacationPackage } from "../../../types/vacationPackage.types";
import type { VacationPackageDetailsMainSection } from "../../../types/vacationPackageDetailsSections.types";

type VacationPackageDetailsContentProps = {
  amenities: VacationPackageFact[];
  vacationPackage: VacationPackage;
  vacationPackageFacts: VacationPackageFact[];
  sections: VacationPackageDetailsMainSection[];
  stayDetails: VacationPackageFact[];
};

export function VacationPackageDetailsContent({
  amenities,
  vacationPackage,
  vacationPackageFacts,
  sections,
  stayDetails,
}: VacationPackageDetailsContentProps) {
  return (
    <div className="min-w-0">
      {sections.includes("description") ? (
        <VacationPackageDescription
          description={vacationPackage.description}
          location={vacationPackage.pageMetadata?.pageTitle ?? vacationPackage.category.label}
          rating={vacationPackage.rating}
          title={vacationPackage.name}
        />
      ) : null}
      <div className="mt-10 grid gap-6">
        {sections.includes("details") ? (
          <VacationPackageDetailList
            gridClassName="grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3"
            items={vacationPackageFacts}
            title="Vacation package details"
          />
        ) : null}
        {sections.includes("stayDetails") ? (
          <VacationPackageDetailList
            gridClassName="grid gap-x-8 gap-y-4 sm:grid-cols-2"
            items={stayDetails}
            title="Stay details"
          />
        ) : null}
        {sections.includes("includedServices") ? (
          <VacationPackageDetailList
            gridClassName="grid gap-x-8 gap-y-4 sm:grid-cols-2"
            items={amenities}
            title="Included services"
          />
        ) : null}
      </div>
    </div>
  );
}
