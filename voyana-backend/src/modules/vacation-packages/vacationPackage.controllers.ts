import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../../shared/utils/apiResponse";
import {
  getVacationPackageIdentityFromParams,
  getVacationPackagesFiltersFromQuery,
} from "./vacationPackage.validators";
import { vacationPackageRepository } from "./repositories/vacationPackage.repository";
import { categoriesRepository } from "./repositories/vacationCategory.repository";

export const getAllVacationPackages = async (req: Request, res: Response) => {
  try {
    const validation = getVacationPackagesFiltersFromQuery(req.query);

    if (validation.errors) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid vacation package filters",
        validation.errors,
      );
    }

    const vacationPackages =
      await vacationPackageRepository.findActiveVacationPackages(
        validation.value,
      );

    return sendSuccess(
      res,
      200,
      vacationPackages,
      "Vacation packages fetched successfully",
      vacationPackages.length,
    );
  } catch (error) {
    console.error("Error fetching vacation packages:", error);
    return sendError(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Failed to fetch vacation packages",
    );
  }
};

export const getVacationPackageById = async (req: Request, res: Response) => {
  try {
    const validation = getVacationPackageIdentityFromParams(req.params);

    if (validation.errors) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid vacation package identity",
        validation.errors,
      );
    }

    const vacationPackage =
      await vacationPackageRepository.findActiveVacationPackageByIdentity(
        validation.value,
      );

    if (!vacationPackage) {
      return sendError(res, 404, "NOT_FOUND", "Vacation package not found");
    }

    return sendSuccess(
      res,
      200,
      vacationPackage,
      "Vacation package fetched successfully",
    );
  } catch (error) {
    console.error("Error fetching vacation package by ID:", error);
    return sendError(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Failed to fetch vacation package by ID",
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
      "Vacation categories fetched successfully",
      categories.length,
    );
  } catch (error) {
    console.error("Error fetching vacation categories:", error);
    return sendError(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Failed to fetch vacation categories",
    );
  }
};
