import Destination from "../models/Destination.model";

const activeDestinationFilter = {
  "publishing.isActive": true,
} as const;

export const destinationRepository = {
  findActiveDestinations() {
    return Destination.find(activeDestinationFilter).sort({
      "publishing.isFeatured": -1,
      createdAt: -1,
    });
  },

  findActiveDestinationIdBySlug(slug: string) {
    return Destination.findOne({
      ...activeDestinationFilter,
      slug,
    }).select("_id");
  },
};
