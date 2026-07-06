import { isValidObjectId } from "mongoose";
import { getRouteParam } from "../../shared/utils/request.utils";
import type { OfferIdentity, OffersFilters } from "./offer.types";

type ValidationResult<T> =
  | {
      value: T;
      errors?: never;
    }
  | {
      value?: never;
      errors: Record<string, string[]>;
    };

const addValidationError = (
  errors: Record<string, string[]>,
  field: string,
  message: string,
) => {
  errors[field] = [...(errors[field] ?? []), message];
};

export const getOffersFiltersFromQuery = (query: {
  destination?: string | string[];
  category?: string | string[];
  maxPrice?: string | string[];
  minPrice?: string | string[];
}): ValidationResult<OffersFilters> => {
  const errors: Record<string, string[]> = {};
  const destination = getRouteParam(query.destination);
  const maxPriceRaw = getRouteParam(query.maxPrice);
  const minPriceRaw = getRouteParam(query.minPrice);
  const categoryRaw = query.category;
  const category = categoryRaw
    ? (Array.isArray(categoryRaw) ? categoryRaw : [categoryRaw])
        .map((c) => c.trim())
        .filter(Boolean)
    : undefined;
  const maxPrice = maxPriceRaw ? Number(maxPriceRaw) : undefined;
  const minPrice = minPriceRaw ? Number(minPriceRaw) : undefined;
  const filters: OffersFilters = {};

  if (destination) {
    filters.destination = destination;
  }

  if (category) {
    filters.category = Array.isArray(category) ? category : [category];
  }

  if (minPriceRaw) {
    if (minPrice === undefined || !Number.isFinite(minPrice) || minPrice < 0) {
      addValidationError(
        errors,
        "minPrice",
        "Minimum price must be a positive number",
      );
    } else {
      filters.minPrice = minPrice;
    }
  }

  if (maxPriceRaw) {
    if (maxPrice === undefined || !Number.isFinite(maxPrice) || maxPrice < 0) {
      addValidationError(
        errors,
        "maxPrice",
        "Maximum price must be a positive number",
      );
    } else {
      filters.maxPrice = maxPrice;
    }
  }

  if (
    filters.minPrice !== undefined &&
    filters.maxPrice !== undefined &&
    filters.minPrice > filters.maxPrice
  ) {
    addValidationError(
      errors,
      "price",
      "Minimum price cannot be greater than maximum price",
    );
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return { value: filters };
};

export const getOfferIdentityFromParams = (params: {
  offerCode?: string;
  offerId?: string;
}): ValidationResult<OfferIdentity> => {
  const errors: Record<string, string[]> = {};
  const offerId = getRouteParam(params.offerId);
  const offerCode = getRouteParam(params.offerCode);

  if (!offerId) {
    addValidationError(errors, "offerId", "Offer ID is required");
  } else if (!isValidObjectId(offerId)) {
    addValidationError(errors, "offerId", "Invalid offer ID format");
  }

  if (!offerCode) {
    addValidationError(errors, "offerCode", "Offer code is required");
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    value: {
      offerCode: offerCode as string,
      offerId: offerId as string,
    },
  };
};
