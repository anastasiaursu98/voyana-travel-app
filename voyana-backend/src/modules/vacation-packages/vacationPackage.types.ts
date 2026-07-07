export type VacationPackagesFilters = {
  destination?: string;
  category?: Array<string>;
  minPrice?: number;
  maxPrice?: number;
};

export type VacationPackageIdentity = {
  vacationPackageCode: string;
  vacationPackageId: string;
};
