import type { Types } from "mongoose";
import { destinationRepository } from "../../destinations/repositories/destination.repository";
import type {
  VacationPackageIdentity,
  VacationPackagesFilters,
} from "../vacationPackage.types";
import VacationPackage from "../models/VacationPackage.model";
import "../models/VacationCategory.model";
import { categoriesRepository } from "./vacationCategory.repository";

const activeVacationPackageFilter = {
  "publishing.isActive": true,
} as const;

const vacationPackagePopulation = [
  {
    path: "category",
    select: "label value -_id",
  },
];

export const vacationPackageRepository = {
  async findActiveVacationPackages({
    category,
    destination,
    maxPrice,
    minPrice,
  }: VacationPackagesFilters) {
    const filters: Record<string, unknown> = {
      ...activeVacationPackageFilter,
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

    return VacationPackage.find(filters).populate(vacationPackagePopulation).sort(
      {
        "publishing.isFeatured": -1,
        "publishing.priority": 1,
        "travelPeriod.startDate": -1,
      },
    );
  },

  findActiveVacationPackageById(vacationPackageId: string) {
    return VacationPackage.findOne({
      ...activeVacationPackageFilter,
      _id: vacationPackageId,
    }).populate(vacationPackagePopulation);
  },

  findActiveVacationPackageByIdentity({
    vacationPackageCode,
    vacationPackageId,
  }: VacationPackageIdentity) {
    return VacationPackage.findOne({
      ...activeVacationPackageFilter,
      _id: vacationPackageId,
      code: vacationPackageCode,
    }).populate(vacationPackagePopulation);
  },

  findVacationPackageIdByCode(code: string) {
    return VacationPackage.findOne({ code }).select("_id");
  },
};
