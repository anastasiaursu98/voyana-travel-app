export type OffersFilters = {
  destination?: string;
  category?: Array<string>;
  minPrice?: number;
  maxPrice?: number;
};

export type OfferIdentity = {
  offerCode: string;
  offerId: string;
};
