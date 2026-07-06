import type { OfferFact } from "./offerDetails.types";

export type OfferTaxonomyLookup = {
  label: string;
  value: string;
};

export type OfferImage = {
  alt: string;
  caption?: string;
  height?: number;
  id?: string;
  url: string;
  width?: number;
};

export type OfferPrice = {
  amount: number;
  currency: "EUR" | "USD" | "RON";
  discountLabel?: string;
  originalAmount?: number;
  unit?: "night" | "person" | "package" | "trip";
};

export type OfferLogistics = {
  amenities?: OfferFact[];
  stayDetails?: OfferFact[];
};

export type Offer = {
  _id: string;
  category: OfferTaxonomyLookup;
  type: OfferTaxonomyLookup;
  code: string;
  description: string;
  destinationId: string;
  media: {
    coverImage: OfferImage;
    galleryImages?: OfferImage[];
  };
  name: string;
  pageMetadata?: {
    pageTitle?: string;
  };
  pricing: OfferPrice;
  logistics?: OfferLogistics;
  publishing?: {
    isActive?: boolean;
    isFeatured?: boolean;
    priority?: number;
  };
  rating?: number;
  slug?: string;
  travelPeriod: {
    duration?: string;
    endDate: string;
    startDate: string;
  };
};

export type OfferFilters = {
  destination?: string;
  category?: Array<string>;
  minPrice?: number;
  maxPrice?: number;
  //   sort?: string;
};
