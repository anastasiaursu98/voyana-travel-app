import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../../shared/utils/apiResponse";
import {
  getOfferIdentityFromParams,
  getOffersFiltersFromQuery,
} from "./offer.validators";
import { offerRepository } from "./repositories/offer.repository";
import { categoriesRepository } from "./repositories/offerCategory.repository";
import { offerTypeRepository } from "./repositories/offerType.repository";

export const getAllOffers = async (req: Request, res: Response) => {
  try {
    const validation = getOffersFiltersFromQuery(req.query);

    if (validation.errors) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid offer filters",
        validation.errors,
      );
    }

    const offers = await offerRepository.findActiveOffers(validation.value);

    return sendSuccess(
      res,
      200,
      offers,
      "Offers fetched successfully",
      offers.length,
    );
  } catch (error) {
    console.error("Error fetching offers:", error);
    return sendError(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Failed to fetch offers",
    );
  }
};

export const getOfferById = async (req: Request, res: Response) => {
  try {
    const validation = getOfferIdentityFromParams(req.params);

    if (validation.errors) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid offer identity",
        validation.errors,
      );
    }

    const offer = await offerRepository.findActiveOfferByIdentity(
      validation.value,
    );

    if (!offer) {
      return sendError(res, 404, "NOT_FOUND", "Offer not found");
    }

    return sendSuccess(res, 200, offer, "Offer fetched successfully");
  } catch (error) {
    console.error("Error fetching offer by ID:", error);
    return sendError(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Failed to fetch offer by ID",
    );
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoriesRepository.findActiveCategories();

    return sendSuccess(
      res,
      200,
      categories,
      "Categories fetched successfully",
      categories.length,
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return sendError(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Failed to fetch categories",
    );
  }
};

export const getTypes = async (req: Request, res: Response) => {
  try {
    const types = await offerTypeRepository.findActiveOfferTypes();

    return sendSuccess(
      res,
      200,
      types,
      "Types fetched successfully",
      types.length,
    );
  } catch (error) {
    console.error("Error fetching types:", error);
    return sendError(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Failed to fetch types",
    );
  }
};
