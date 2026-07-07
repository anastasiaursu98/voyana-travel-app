import { Schema } from "mongoose";
import {
  createPublishingSchema,
  galleryImageSchema,
  imageSchema,
  videoSchema,
} from "../../../shared/schemas/common.schemas";
import { vacationPackageCategoryDetailsSchema } from "./vacationPackageCategoryDetails.schemas";
import {
  vacationPackageAvailabilitySchema,
  vacationPackageCommercialSchema,
} from "./vacationPackageCommercial.schemas";
import { vacationPackageLogisticsSchema } from "./vacationPackageDetails.schemas";
import {
  vacationPackageAccommodationSchema,
  vacationPackageInclusionsSchema,
  vacationPackagePoliciesSchema,
  vacationPackageTransportSchema,
} from "./vacationPackageTravel.schemas";

const vacationPackagePublishingSchema = createPublishingSchema({
  withPriority: true,
});

const vacationPackagePageMetadataSchema = new Schema(
  {
    pageTitle: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false },
);

/**
 * Sellable vacation package model.
 * Common fields describe pricing, media, travel period, and vacation category;
 * commercial, inclusions, and categoryDetails describe how the package is sold
 * and what category-specific facts are valid for it.
 */
export const vacationPackageSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    destinationId: {
      type: Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
      index: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "VacationCategory",
      required: true,
      index: true,
    },
    media: {
      coverImage: {
        type: imageSchema,
        required: true,
      },
      galleryImages: {
        type: [galleryImageSchema],
        default: [],
      },
      featuredVideo: {
        type: videoSchema,
      },
    },
    pricing: {
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        required: true,
        trim: true,
        default: "EUR",
      },
      unit: {
        type: String,
        trim: true,
        default: "person",
      },
      originalAmount: {
        type: Number,
        min: 0,
      },
      discountLabel: {
        type: String,
        trim: true,
      },
    },
    travelPeriod: {
      duration: {
        type: String,
        trim: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    logistics: {
      type: vacationPackageLogisticsSchema,
      default: {},
    },
    commercial: {
      type: vacationPackageCommercialSchema,
      default: {},
    },
    availability: {
      type: vacationPackageAvailabilitySchema,
      default: {},
    },
    inclusions: {
      type: vacationPackageInclusionsSchema,
      default: {},
    },
    accommodation: {
      type: vacationPackageAccommodationSchema,
      default: {},
    },
    transport: {
      type: vacationPackageTransportSchema,
      default: {},
    },
    policies: {
      type: vacationPackagePoliciesSchema,
      default: {},
    },
    categoryDetails: {
      type: vacationPackageCategoryDetailsSchema,
      required: true,
    },
    publishing: {
      type: vacationPackagePublishingSchema,
      default: {},
    },
    pageMetadata: {
      type: vacationPackagePageMetadataSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

vacationPackageSchema.index({
  "publishing.isActive": 1,
  "publishing.isFeatured": -1,
  "publishing.priority": 1,
  "travelPeriod.startDate": -1,
});

vacationPackageSchema.index({
  "commercial.campaignType": 1,
  "availability.status": 1,
});
