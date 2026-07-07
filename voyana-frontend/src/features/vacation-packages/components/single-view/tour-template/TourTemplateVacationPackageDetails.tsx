import type { VacationPackage } from "../../../types/vacationPackage.types";
import { TourTemplateItinerary } from "./TourTemplateItinerary";

type TourTemplateVacationPackageDetailsProps = {
  vacationPackage: VacationPackage;
};

export function TourTemplateVacationPackageDetails({
  vacationPackage,
}: TourTemplateVacationPackageDetailsProps) {
  return (
    <div className="grid gap-6 bg-white">
      <TourTemplateItinerary
        itineraryDays={vacationPackage.categoryDetails?.itineraryDays}
      />
    </div>
  );
}
