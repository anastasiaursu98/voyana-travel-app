export type VacationPackageIconName =
  | "activity"
  | "airportShuttle"
  | "bar"
  | "beach"
  | "briefcase"
  | "breakfast"
  | "calendar"
  | "check"
  | "coffee"
  | "cruise"
  | "family"
  | "fitness"
  | "hotel"
  | "location"
  | "meal"
  | "mountain"
  | "pool"
  | "restaurant"
  | "roomService"
  | "smokeFree"
  | "spa"
  | "transport";

export type VacationPackageFact = {
  icon?: VacationPackageIconName;
  id: string;
  label: string;
  value: string;
};
