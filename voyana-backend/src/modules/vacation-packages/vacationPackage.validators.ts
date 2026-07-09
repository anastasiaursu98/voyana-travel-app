import { isValidObjectId } from "mongoose";
import { getRouteParam } from "../../shared/utils/request.utils";
import type {
  VacationPackageIdentity,
  VacationPackagesFilters,
} from "./vacationPackage.types";

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

export const getVacationPackagesFiltersFromQuery = (query: {
  destination?: string | string[];
  category?: string | string[];
  maxPrice?: string | string[];
  minPrice?: string | string[];
  campaignType?: string | string[];
}): ValidationResult<VacationPackagesFilters> => {
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
  const campaignTypeRaw = query.campaignType;
  const campaignType = campaignTypeRaw
    ? (Array.isArray(campaignTypeRaw) ? campaignTypeRaw : [campaignTypeRaw])
        .map((c) => c.trim())
        .filter(Boolean)
    : undefined;
  const maxPrice = maxPriceRaw ? Number(maxPriceRaw) : undefined;
  const minPrice = minPriceRaw ? Number(minPriceRaw) : undefined;
  const filters: VacationPackagesFilters = {};

  if (destination) {
    filters.destination = destination;
  }

  if (category) {
    filters.category = Array.isArray(category) ? category : [category];
  }
  if (campaignType) {
    filters.campaignType = Array.isArray(campaignType)
      ? campaignType
      : [campaignType];
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

export const getVacationPackageIdentityFromParams = (params: {
  vacationPackageCode?: string;
  vacationPackageId?: string;
}): ValidationResult<VacationPackageIdentity> => {
  const errors: Record<string, string[]> = {};
  const vacationPackageId = getRouteParam(params.vacationPackageId);
  const vacationPackageCode = getRouteParam(params.vacationPackageCode);

  if (!vacationPackageId) {
    addValidationError(
      errors,
      "vacationPackageId",
      "VacationPackage ID is required",
    );
  } else if (!isValidObjectId(vacationPackageId)) {
    addValidationError(
      errors,
      "vacationPackageId",
      "Invalid vacationPackage ID format",
    );
  }

  if (!vacationPackageCode) {
    addValidationError(
      errors,
      "vacationPackageCode",
      "VacationPackage code is required",
    );
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    value: {
      vacationPackageCode: vacationPackageCode as string,
      vacationPackageId: vacationPackageId as string,
    },
  };
};
