import type { Types } from "mongoose";
import { destinationRepository } from "../../destinations/repositories/destination.repository";
import type { OfferIdentity, OffersFilters } from "../offer.types";
import Offer from "../models/Offer.model";
import "../models/OfferCategory.model";
import "../models/OfferType.model";
import { categoriesRepository } from "./offerCategory.repository";

const activeOfferFilter = {
  "publishing.isActive": true,
} as const;

const offerPopulation = [
  {
    path: "category",
    select: "label value -_id",
  },
  {
    path: "type",
    select: "label value -_id",
  },
];

export const offerRepository = {
  async findActiveOffers({
    category,
    destination,
    maxPrice,
    minPrice,
  }: OffersFilters) {
    const filters: Record<string, unknown> = {
      ...activeOfferFilter,
    };

    if (destination) {
      const destinationDoc =
        await destinationRepository.findActiveDestinationIdBySlug(destination);

      if (!destinationDoc) {
        return [];
      }

      filters.destinationId = destinationDoc._id;
    }

    if (category && category.length > 0) {
      const categoryDocs = await Promise.all(
        category.map((value) =>
          categoriesRepository.findActiveCategoryIdByValue(value),
        ),
      );

      const categoryIds = categoryDocs
        .flat()
        .map((doc) => doc._id as Types.ObjectId);

      if (categoryIds.length === 0) {
        return [];
      }

      filters.category = { $in: categoryIds };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filters["pricing.amount"] = {
        ...(minPrice !== undefined ? { $gte: minPrice } : {}),
        ...(maxPrice !== undefined ? { $lte: maxPrice } : {}),
      };
    }

    return Offer.find(filters).populate(offerPopulation).sort({
      "publishing.isFeatured": -1,
      "publishing.priority": 1,
      "travelPeriod.startDate": -1,
    });
  },

  findActiveOfferById(offerId: string) {
    return Offer.findOne({
      ...activeOfferFilter,
      _id: offerId,
    }).populate(offerPopulation);
  },

  findActiveOfferByIdentity({ offerCode, offerId }: OfferIdentity) {
    return Offer.findOne({
      ...activeOfferFilter,
      _id: offerId,
      code: offerCode,
    }).populate(offerPopulation);
  },

  findOfferIdByCode(code: string) {
    return Offer.findOne({ code }).select("_id");
  },
};
