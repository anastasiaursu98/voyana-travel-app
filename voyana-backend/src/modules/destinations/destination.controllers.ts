import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../../shared/utils/apiResponse";
import { destinationRepository } from "./repositories/destination.repository";

export const getAllDestinations = async (req: Request, res: Response) => {
  try {
    const destinations = await destinationRepository.findActiveDestinations();

    return sendSuccess(
      res,
      200,
      destinations,
      "Destinations fetched successfully",
      destinations.length,
    );
  } catch (error) {
    return sendError(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Failed to fetch destinations",
    );
  }
};
