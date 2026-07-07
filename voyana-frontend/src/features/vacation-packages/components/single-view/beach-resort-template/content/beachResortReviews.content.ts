import type {
  Review,
  ReviewCategoryScore,
  ReviewSummary,
} from "../../../../../reviews";

export const beachResortReviewSummary: ReviewSummary = {
  label: "Wonderful",
  reviewCount: 312,
  score: 9.2,
} as const;

export const beachResortReviewCategories: ReviewCategoryScore[] = [
  {
    label: "Staff",
    score: 9.5,
  },
  {
    label: "Facilities",
    score: 9.1,
  },
  {
    label: "Cleanliness",
    score: 9.4,
  },
  {
    label: "Comfort",
    score: 9.3,
  },
  {
    label: "Value for money",
    score: 8.9,
  },
  {
    label: "Location",
    score: 9.7,
  },
  {
    label: "Free WiFi",
    score: 9.0,
  },
] as const;

export const beachResortReviews: Review[] = [
  {
    avatarInitials: "AM",
    date: "May 2026",
    location: "London, United Kingdom",
    name: "Amelia Morgan",
    quote:
      "The Hurghada resort made the whole beach week easy. Transfers were clear, the room matched the photos, and the all-inclusive package was simple to compare.",
    rating: 5,
    stayType: "7-night Red Sea resort stay",
  },
  {
    avatarInitials: "DR",
    date: "April 2026",
    location: "Berlin, Germany",
    name: "Daniel Richter",
    quote:
      "Everything was organized in one place, from dates to guests, meal plan, and transfer. It felt transparent before booking, which made the decision simple.",
    rating: 5,
    stayType: "All-inclusive resort stay",
  },
  {
    avatarInitials: "IS",
    date: "March 2026",
    location: "Cluj-Napoca, Romania",
    name: "Ioana Sandu",
    quote:
      "Great value for a first trip to Egypt. The resort amenities were accurate, check-in was smooth, and support answered our questions quickly.",
    rating: 4,
    stayType: "Couples package",
  },
  {
    avatarInitials: "MK",
    date: "February 2026",
    location: "Amsterdam, Netherlands",
    name: "Mila Koster",
    quote:
      "The room was quiet, the pools were clean, and the food options worked well for the family. We would book the same package again.",
    rating: 5,
    stayType: "Family stay",
  },
  {
    avatarInitials: "LP",
    date: "January 2026",
    location: "Paris, France",
    name: "Lucas Perrin",
    quote:
      "Very clear pricing and a comfortable resort. The package details helped us compare options quickly before committing.",
    rating: 4,
    stayType: "City escape",
  },
  {
    avatarInitials: "EC",
    date: "December 2025",
    location: "Rome, Italy",
    name: "Elena Costa",
    quote:
      "Check-in was smooth, the staff were friendly, and the location worked well for beach time, snorkeling, and relaxed evenings.",
    rating: 5,
    stayType: "Beach resort break",
  },
] as const;
