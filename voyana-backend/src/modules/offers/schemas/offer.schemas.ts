import { Schema } from "mongoose";
import {
  createPublishingSchema,
  galleryImageSchema,
  imageSchema,
} from "../../../shared/schemas/common.schemas";
import { offerLogisticsSchema } from "./offerDetails.schemas";

const offerPublishingSchema = createPublishingSchema({ withPriority: true });

const offerPageMetadataSchema = new Schema(
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
 * Sellable travel offer model.
 * Common fields describe pricing, media, travel period, and offer taxonomy;
 * logistics holds practical offer facts used by detail pages.
 */
export const offerSchema = new Schema(
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
      ref: "OfferCategory",
      required: true,
      index: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "OfferType",
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
      type: offerLogisticsSchema,
      default: {},
    },
    publishing: {
      type: offerPublishingSchema,
      default: {},
    },
    pageMetadata: {
      type: offerPageMetadataSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

offerSchema.index({
  "publishing.isActive": 1,
  "publishing.isFeatured": -1,
  "publishing.priority": 1,
  "travelPeriod.startDate": -1,
});
offerSchema.index({
  category: 1,
  type: 1,
});
