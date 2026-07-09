import type { VacationPackageFilters } from "../types/vacationPackageFilters.types";

export type VacationPackageFilterSectionOption = {
  count?: number;
  label: string;
  value: string;
};

export type VacationPackageCheckboxFilterOptions = {
  accommodationTypes?: VacationPackageFilterSectionOption[];
  availabilityStatuses?: VacationPackageFilterSectionOption[];
  categories?: VacationPackageFilterSectionOption[];
  dealTypes?: VacationPackageFilterSectionOption[];
  mealPlans?: VacationPackageFilterSectionOption[];
  transportationTypes?: VacationPackageFilterSectionOption[];
};

export type VacationPackageCheckboxFilterSection = {
  options?: VacationPackageFilterSectionOption[];
  paramName: keyof Pick<
    VacationPackageFilters,
    | "accommodationType"
    | "availabilityStatus"
    | "campaignType"
    | "category"
    | "mealPlan"
    | "transportationType"
  >;
  selectedValues: string[];
  title: string;
};

export const getVacationPackageCheckboxFilterSections = (
  options: VacationPackageCheckboxFilterOptions,
  filters?: VacationPackageFilters,
): VacationPackageCheckboxFilterSection[] => [
  {
    title: "Category",
    options: options.categories,
    selectedValues: filters?.category ?? [],
    paramName: "category",
  },
  {
    title: "Deal type",
    options: options.dealTypes,
    selectedValues: filters?.campaignType ?? [],
    paramName: "campaignType",
  },
  {
    title: "Meal plan",
    options: options.mealPlans,
    selectedValues: filters?.mealPlan ?? [],
    paramName: "mealPlan",
  },
  {
    title: "Accommodation type",
    options: options.accommodationTypes,
    selectedValues: filters?.accommodationType ?? [],
    paramName: "accommodationType",
  },
  {
    title: "Availability status",
    options: options.availabilityStatuses,
    selectedValues: filters?.availabilityStatus ?? [],
    paramName: "availabilityStatus",
  },
  {
    title: "Transportation",
    options: options.transportationTypes,
    selectedValues: filters?.transportationType ?? [],
    paramName: "transportationType",
  },
];
