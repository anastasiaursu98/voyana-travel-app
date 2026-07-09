export const activeVacationPackageFilter = {
  "publishing.isActive": true,
} as const;

export const vacationPackagePopulation = [
  {
    path: "category",
    select: "label value -_id",
  },
];
