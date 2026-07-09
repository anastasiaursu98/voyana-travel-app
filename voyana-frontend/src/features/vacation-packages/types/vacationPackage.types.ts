import type { VacationPackageFact } from "./vacationPackageDetails.types";

export type VacationPackageTaxonomyLookup = {
  label: string;
  value: string;
};

export type VacationPackageLabelValue = {
  label: string;
  value: string;
};

export type VacationCategory = VacationPackageTaxonomyLookup & {
  _id: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
};

export type VacationPackageImage = {
  alt: string;
  caption?: string;
  height?: number;
  id?: string;
  url: string;
  width?: number;
};

export type VacationPackageVideo = {
  caption?: string;
  licenseUrl?: string;
  provider: string;
  thumbnailUrl?: string;
  title: string;
  url: string;
};

export type VacationPackagePrice = {
  amount: number;
  currency: "EUR" | "USD" | "RON";
  discountLabel?: string;
  originalAmount?: number;
  unit?: "night" | "person" | "package" | "trip";
};

export type VacationPackageCampaignType =
  | "STANDARD"
  | "LAST_MINUTE"
  | "EARLY_BOOKING"
  | "SEASONAL_DEAL"
  | "LIMITED_AVAILABILITY"
  | "SPECIAL_OFFER";

export type VacationPackageAvailabilityStatus =
  | "AVAILABLE"
  | "LIMITED"
  | "SOLD_OUT"
  | "ON_REQUEST";

export type VacationPackageMealPlan =
  | "ROOM_ONLY"
  | "BREAKFAST"
  | "HALF_BOARD"
  | "FULL_BOARD"
  | "ALL_INCLUSIVE"
  | "SELECTED_MEALS";

export type VacationPackageAccommodationType =
  | "HOTEL"
  | "RESORT"
  | "APARTMENT"
  | "VILLA"
  | "CRUISE_CABIN"
  | "CHALET"
  | "LODGE";

export type VacationPackageCategoryKind =
  | "BEACH_HOLIDAYS"
  | "CITY_BREAKS"
  | "CULTURE_AND_HISTORY"
  | "ADVENTURE_AND_OUTDOOR"
  | "FAMILY"
  | "WELLNESS_AND_SPA"
  | "CRUISES"
  | "SKI_AND_WINTER"
  | "TOURS_AND_ITINERARIES";

export type VacationPackageCommercial = {
  badges?: VacationPackageLabelValue[];
  bookingDeadline?: string;
  campaignLabel?: string;
  campaignType?: VacationPackageLabelValue & {
    value: VacationPackageCampaignType;
  };
};

export type VacationPackageAvailability = {
  remainingUnits?: number;
  status?: VacationPackageAvailabilityStatus;
  totalUnits?: number;
  urgencyLabel?: string;
};

export type VacationPackageInclusions = {
  mealPlan?: VacationPackageMealPlan;
  services?: VacationPackageLabelValue[];
  transport?: VacationPackageLabelValue[];
};

export type VacationPackageAccommodation = {
  boardBasis?: string;
  rating?: number;
  roomType?: string;
  type?: VacationPackageAccommodationType;
};

export type VacationPackageTransport = {
  arrivalCity?: string;
  departureCity?: string;
  included?: boolean;
  types?: VacationPackageLabelValue[];
};

export type VacationPackagePolicies = {
  cancellation?: string;
  children?: string;
  payment?: string;
};

export type VacationPackageCategoryDetails = {
  adultsOnly?: boolean;
  babysittingAvailable?: boolean;
  beachAccess?: string;
  cabinType?: string;
  centralLocation?: boolean;
  childAgeBands?: string[];
  childPricing?: string;
  difficulty?: string;
  disembarkationPort?: string;
  distanceToBeachMeters?: number;
  distanceToLiftMeters?: number;
  embarkationPort?: string;
  equipmentIncluded?: boolean;
  equipmentRentalIncluded?: boolean;
  familyRooms?: boolean;
  fitnessLevel?: string;
  groupSize?: number;
  guideIncluded?: boolean;
  guideLanguages?: string[];
  includedAdmissions?: string[];
  includedTickets?: string[];
  itinerary?: string[];
  itineraryDays?: VacationPackageItineraryDay[];
  kidsClub?: boolean;
  liftPassIncluded?: boolean;
  neighborhood?: string;
  pace?: string;
  permitsIncluded?: boolean;
  poolCount?: number;
  ports?: string[];
  publicTransportAccess?: boolean;
  recommendedStayStyle?: string;
  resortFacilities?: string[];
  route?: string[];
  shipName?: string;
  skiArea?: string;
  spaAccessIncluded?: boolean;
  treatmentsIncluded?: string[];
  wellnessProgram?: string;
};

export type VacationPackageItineraryDay = {
  accommodation: {
    description?: string;
    highlights: string[];
    imageUrl?: string;
    meta?: string;
    nights: string;
    title: string;
  };
  activities: string[];
  cityDescription?: string;
  day: number;
  departure?: string;
  image: VacationPackageImage;
  location: string;
  stayLabel?: string;
  title: string;
  transportation: {
    arrival?: string;
    carrier?: string;
    departure?: string;
    description?: string;
    duration?: string;
    luggage?: string;
    route?: string;
    type: "flight" | "rail" | "transfer" | "walk";
  };
};

export type VacationPackageLogistics = {
  amenities?: VacationPackageFact[];
  stayDetails?: VacationPackageFact[];
};

export type VacationPackage = {
  _id: string;
  category: VacationPackageTaxonomyLookup;
  code: string;
  description: string;
  destinationId: string;
  media: {
    coverImage: VacationPackageImage;
    featuredVideo?: VacationPackageVideo;
    galleryImages?: VacationPackageImage[];
  };
  name: string;
  accommodation?: VacationPackageAccommodation;
  availability?: VacationPackageAvailability;
  categoryDetails?: VacationPackageCategoryDetails;
  commercial?: VacationPackageCommercial;
  inclusions?: VacationPackageInclusions;
  pageMetadata?: {
    pageTitle?: string;
  };
  policies?: VacationPackagePolicies;
  pricing: VacationPackagePrice;
  logistics?: VacationPackageLogistics;
  publishing?: {
    isActive?: boolean;
    isFeatured?: boolean;
    priority?: number;
  };
  rating?: number;
  slug?: string;
  transport?: VacationPackageTransport;
  travelPeriod: {
    duration?: string;
    endDate: string;
    startDate: string;
  };
};
