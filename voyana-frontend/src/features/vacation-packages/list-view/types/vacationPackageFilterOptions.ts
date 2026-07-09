export type CategoryFilterOption = {
  count: number;
  description: string;
  label: string;
  value: string;
  _id: string;
};

export type VacationPackageFilterOption = {
  count: number;
  label: string;
  value: string;
};

export type VacationPackageFilterOptions = {
  accommodationTypes: Array<VacationPackageFilterOption>;
  availabilityStatuses: Array<VacationPackageFilterOption>;
  campaignTypes: Array<VacationPackageFilterOption>;
  categories: Array<CategoryFilterOption>;
  mealPlans: Array<VacationPackageFilterOption>;
  transportationTypes: Array<VacationPackageFilterOption>;
  message: string;
};
