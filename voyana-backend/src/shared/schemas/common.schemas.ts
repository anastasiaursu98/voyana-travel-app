import { Schema } from "mongoose";

/**
 * Reusable display option for enum-like fields exposed to the frontend.
 * `value` stays stable for filters/storage logic, while `label` is ready for UI.
 */
export const labelValueSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

/**
 * Reusable image metadata for a single display image.
 * Used by destination cover images and vacation package media cover images.
 */
export const imageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      required: true,
      trim: true,
    },
    caption: {
      type: String,
      trim: true,
      default: "",
    },
    width: {
      type: Number,
      min: 0,
    },
    height: {
      type: Number,
      min: 0,
    },
  },
  { _id: false },
);

/**
 * Reusable gallery image metadata.
 * Adds a stable id so UI galleries can track and reorder images reliably.
 */
export const galleryImageSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      required: true,
      trim: true,
    },
    caption: {
      type: String,
      trim: true,
      default: "",
    },
    width: {
      type: Number,
      min: 0,
    },
    height: {
      type: Number,
      min: 0,
    },
  },
  { _id: false },
);

/**
 * Reusable external video metadata.
 * Stores source information without forcing every record to host a local file.
 */
export const videoSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    provider: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    caption: {
      type: String,
      trim: true,
      default: "",
    },
    thumbnailUrl: {
      type: String,
      trim: true,
    },
    licenseUrl: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

/**
 * Public page metadata for records that can have their own landing/detail page.
 * This is intentionally product-facing, instead of using a generic "seo" name.
 */
export const pageMetadataSchema = new Schema(
  {
    pageTitle: {
      type: String,
      trim: true,
      default: "",
    },
    pageDescription: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false },
);

type PublishingSchemaOptions = {
  withPriority?: boolean;
};

/**
 * Shared publishing state for documents that can be shown or hidden publicly.
 * Priority is optional because vacation packages need ordered merchandising, while
 * destinations only need active/featured flags for now.
 */
export const createPublishingSchema = ({
  withPriority = false,
}: PublishingSchemaOptions = {}) =>
  new Schema(
    {
      isActive: {
        type: Boolean,
        default: true,
        index: true,
      },
      isFeatured: {
        type: Boolean,
        default: false,
        index: true,
      },
      ...(withPriority
        ? {
            priority: {
              type: Number,
              default: 100,
              index: true,
            },
          }
        : {}),
    },
    { _id: false },
  );
