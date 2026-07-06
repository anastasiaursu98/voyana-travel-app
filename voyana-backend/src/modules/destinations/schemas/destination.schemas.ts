import { Schema } from "mongoose";
import {
  createPublishingSchema,
  galleryImageSchema,
  imageSchema,
} from "../../../shared/schemas/common.schemas";

const destinationPublishingSchema = createPublishingSchema();

/**
 * Travel destination model.
 * Describes a country-level destination shown in destination discovery.
 * City, resort-area, and island-level filtering belongs in a separate Place model.
 */
export const destinationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    countryCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minlength: 2,
      maxlength: 2,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
      type: imageSchema,
      required: true,
    },
    galleryImages: {
      type: [galleryImageSchema],
      default: [],
    },
    startingPrice: {
      type: Number,
      min: 0,
    },
    publishing: {
      type: destinationPublishingSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

destinationSchema.index({
  "publishing.isActive": 1,
  "publishing.isFeatured": -1,
  createdAt: -1,
});
destinationSchema.index({
  name: "text",
});
