import type {
  Review,
  ReviewCategoryScore,
  ReviewSummary,
} from "../../reviews";

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

export type VacationPackageHighlight = {
  description?: string;
  icon?: VacationPackageIconName;
  id: string;
  label: string;
};

export type VacationPackageChecklistItem = {
  description?: string;
  id: string;
  label: string;
};

export type VacationPackageItineraryDay = {
  activities: string[];
  day: number;
  title: string;
};

export type VacationPackageFact = {
  icon?: VacationPackageIconName;
  id: string;
  label: string;
  value: string;
};

export type VacationPackageActivity = {
  description?: string;
  duration?: string;
  id: string;
  title: string;
};

export type VacationPackagePolicy = {
  description: string;
  id: string;
  title: string;
};

export type VacationPackageFaqItem = {
  answer: string;
  id: string;
  question: string;
};

export type VacationPackagePriceBreakdownItem = {
  amount: number;
  currency: "EUR" | "USD" | "RON";
  id: string;
  label: string;
};

export type VacationPackageReviewsContent = {
  categories: ReviewCategoryScore[];
  description?: string;
  eyebrow?: string;
  reviews: Review[];
  summary: ReviewSummary;
  title?: string;
};
