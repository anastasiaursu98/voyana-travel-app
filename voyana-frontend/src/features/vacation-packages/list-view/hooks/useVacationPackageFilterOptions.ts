import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import {
  fetchVacationFiltersOptions,
  selectVacationFiltersOptions,
} from "../../store/vacationPackagesSlice";

export function useVacationPackageFilterOptions() {
  const searchParams = new URLSearchParams(window.location.search);
  const destination = searchParams.get("destination") || undefined;

  const dispatch = useAppDispatch();
  const filterOptions = useAppSelector(selectVacationFiltersOptions);

  useEffect(() => {
    dispatch(fetchVacationFiltersOptions(destination));
  }, [dispatch, destination]);

  const categories = filterOptions?.categories.map((category) => ({
    label: category.label,
    value: category.value,
  }));

  const dealTypes =
    filterOptions?.campaignTypes && filterOptions.campaignTypes.length > 0
      ? filterOptions.campaignTypes.map(({ label, value }) => ({
          label,
          value,
        }))
      : [];
  const mealPlans =
    filterOptions?.mealPlans && filterOptions.mealPlans.length > 0
      ? filterOptions.mealPlans.map(({ label, value }) => ({
          label,
          value,
        }))
      : [];
  const accommodationTypes =
    filterOptions?.accommodationTypes &&
    filterOptions.accommodationTypes.length > 0
      ? filterOptions.accommodationTypes.map(({ label, value }) => ({
          label,
          value,
        }))
      : [];
  const availabilityStatuses =
    filterOptions?.availabilityStatuses &&
    filterOptions.availabilityStatuses.length > 0
      ? filterOptions.availabilityStatuses.map(({ label, value }) => ({
          label,
          value,
        }))
      : [];
  const transportationTypes =
    filterOptions?.transportationTypes &&
    filterOptions.transportationTypes.length > 0
      ? filterOptions.transportationTypes.map(({ label, value }) => ({
          label,
          value,
        }))
      : [];
  return {
    categories,
    dealTypes,
    mealPlans,
    accommodationTypes,
    availabilityStatuses,
    transportationTypes,
  };
}
