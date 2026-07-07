import { routes } from "../../../app/router/routes";
import type { VacationPackageDetailsMainSection } from "../types/vacationPackageDetailsSections.types";
import { useVacationPackageDetails } from "./useVacationPackageDetails";

type UseVacationPackageDetailsViewModelParams = {
  mainSections: VacationPackageDetailsMainSection[];
};

export function useVacationPackageDetailsViewModel({
  mainSections,
}: UseVacationPackageDetailsViewModelParams) {
  const { currentVacationPackage, vacationPackageError, vacationPackageFacts, vacationPackageStatus } =
    useVacationPackageDetails();
  const pageTitle = currentVacationPackage?.name ?? "Vacation package";
  const isLoading = currentVacationPackage === null;
  const loadingMessage =
    vacationPackageStatus === "failed"
      ? (vacationPackageError ?? "Vacation package could not be loaded.")
      : "Loading vacation package...";

  return {
    amenities:
      currentVacationPackage !== null && mainSections.includes("includedServices")
        ? (currentVacationPackage.logistics?.amenities ?? [])
        : [],
    backLabel: "Vacation packages",
    backTo: routes.vacationPackages,
    currentVacationPackage,
    isLoading,
    loadingMessage,
    vacationPackageFacts,
    pageTitle,
    stayDetails:
      currentVacationPackage !== null && mainSections.includes("stayDetails")
        ? (currentVacationPackage.logistics?.stayDetails ?? [])
        : [],
  };
}
