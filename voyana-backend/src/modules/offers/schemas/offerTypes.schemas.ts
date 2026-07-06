import { Schema } from "mongoose";

export const offerTypesSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "OfferCategory",
      required: true,
      index: true,
    },
    displayOrder: {
      type: Number,
      required: true,
      default: 0,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

offerTypesSchema.index({
  categoryId: 1,
  isActive: 1,
  displayOrder: 1,
  label: 1,
});
