import type {
  Review,
  ReviewCategoryScore,
  ReviewSummary,
} from "../../reviews";

export type OfferIconName =
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

export type OfferHighlight = {
  description?: string;
  icon?: OfferIconName;
  id: string;
  label: string;
};

export type OfferChecklistItem = {
  description?: string;
  id: string;
  label: string;
};

export type OfferItineraryDay = {
  activities: string[];
  day: number;
  title: string;
};

export type OfferFact = {
  icon?: OfferIconName;
  id: string;
  label: string;
  value: string;
};

export type OfferActivity = {
  description?: string;
  duration?: string;
  id: string;
  title: string;
};

export type OfferPolicy = {
  description: string;
  id: string;
  title: string;
};

export type OfferFaqItem = {
  answer: string;
  id: string;
  question: string;
};

export type OfferPriceBreakdownItem = {
  amount: number;
  currency: "EUR" | "USD" | "RON";
  id: string;
  label: string;
};

export type OfferReviewsContent = {
  categories: ReviewCategoryScore[];
  description?: string;
  eyebrow?: string;
  reviews: Review[];
  summary: ReviewSummary;
  title?: string;
};
