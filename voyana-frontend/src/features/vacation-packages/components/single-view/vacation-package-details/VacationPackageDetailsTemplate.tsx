import type { VacationPackage } from "../../../types/vacationPackage.types";
import { BeachResortVacationPackageDetails } from "../beach-resort-template";
import { TourTemplateVacationPackageDetails } from "../tour-template";

type VacationPackageDetailsTemplateContentProps = {
  vacationPackage: VacationPackage;
};

export function VacationPackageDetailsTemplateContent({
  vacationPackage,
}: VacationPackageDetailsTemplateContentProps) {
  switch (vacationPackage.category.value) {
    case "BEACH_HOLIDAYS":
      return <BeachResortVacationPackageDetails />;

    case "TOURS_AND_ITINERARIES":
      return (
        <TourTemplateVacationPackageDetails vacationPackage={vacationPackage} />
      );

    default:
      return null;
  }
}
