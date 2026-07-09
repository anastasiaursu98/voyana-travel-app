import type { PipelineStage } from "mongoose";
import { destinationRepository } from "../../destinations/repositories/destination.repository";
import VacationPackage from "../models/VacationPackage.model";
import type { VacationPackagesFilters } from "../vacationPackage.types";
import { activeVacationPackageFilter } from "./vacationPackage.repository.constants";
import {
  buildLabelValueArrayFilterOptionsPipeline,
  buildStringValueFilterOptionsPipeline,
} from "./vacationPackageFilterOptions.pipeline";

const buildVacationPackageBaseFilter = async ({
  destination,
}: Pick<VacationPackagesFilters, "destination">) => {
  const filters: Record<string, unknown> = {
    ...activeVacationPackageFilter,
  };

  if (destination) {
    const destinationDoc =
      await destinationRepository.findActiveDestinationIdBySlug(destination);

    if (!destinationDoc) {
      return null;
    }

    filters.destinationId = destinationDoc._id;
  }

  return filters;
};

const aggregateWithVacationPackageBaseFilter = async (
  { destination }: VacationPackagesFilters,
  pipeline: PipelineStage[],
) => {
  const filters = await buildVacationPackageBaseFilter({ destination });

  if (!filters) {
    return [];
  }

  return VacationPackage.aggregate([{ $match: filters }, ...pipeline]);
};

const findAvailableStringValueFilterOptions = (
  filters: VacationPackagesFilters,
  params: {
    labelPath?: string;
    sort?: Record<string, 1 | -1>;
    valuePath: string;
  },
) =>
  aggregateWithVacationPackageBaseFilter(
    filters,
    buildStringValueFilterOptionsPipeline(params),
  );

const findAvailableLabelValueArrayFilterOptions = (
  filters: VacationPackagesFilters,
  params: {
    arrayPath: string;
    sort?: Record<string, 1 | -1>;
  },
) =>
  aggregateWithVacationPackageBaseFilter(
    filters,
    buildLabelValueArrayFilterOptionsPipeline(params),
  );

export const vacationPackageFilterOptionsRepository = {
  findAvailableFilterCategories(filters: VacationPackagesFilters) {
    return aggregateWithVacationPackageBaseFilter(filters, [
      { $group: { _id: "$category", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "vacationcategories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      { $match: { "category.isActive": true } },
      {
        $project: {
          _id: "$category._id",
          label: "$category.label",
          value: "$category.value",
          description: "$category.description",
          displayOrder: "$category.displayOrder",
          count: 1,
        },
      },
      { $sort: { displayOrder: 1, label: 1 } },
    ]);
  },
  findAvailableFilterCampaignTypes(filters: VacationPackagesFilters) {
    return findAvailableStringValueFilterOptions(filters, {
      labelPath: "commercial.campaignType.label",
      valuePath: "commercial.campaignType.value",
    });
  },
  findAvailableFilterMealPlans(filters: VacationPackagesFilters) {
    return findAvailableStringValueFilterOptions(filters, {
      valuePath: "inclusions.mealPlan",
    });
  },
  findAvailableFilterTransportationTypes(filters: VacationPackagesFilters) {
    return findAvailableLabelValueArrayFilterOptions(filters, {
      arrayPath: "transport.types",
    });
  },
  findAvailableFilterAvailabilityStatuses(filters: VacationPackagesFilters) {
    return findAvailableStringValueFilterOptions(filters, {
      valuePath: "availability.status",
    });
  },
  findAvailableFilterAccommodationTypes(filters: VacationPackagesFilters) {
    return findAvailableStringValueFilterOptions(filters, {
      valuePath: "accommodation.type",
    });
  },
};
