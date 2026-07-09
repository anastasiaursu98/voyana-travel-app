import { Schema } from "mongoose";
import { labelValueSchema } from "../../../shared/schemas/common.schemas";

export const vacationPackageCommercialSchema = new Schema(
  {
    campaignType: {
      type: labelValueSchema,
      default: {
        label: "Standard",
        value: "STANDARD",
      },
    },
    campaignLabel: {
      type: String,
      trim: true,
    },
    badges: {
      type: [labelValueSchema],
      default: [],
    },
    bookingDeadline: {
      type: Date,
    },
  },
  { _id: false },
);

export const vacationPackageAvailabilitySchema = new Schema(
  {
    status: {
      type: String,
      enum: ["AVAILABLE", "LIMITED", "SOLD_OUT", "ON_REQUEST"],
      trim: true,
      default: "AVAILABLE",
      index: true,
    },
    remainingUnits: {
      type: Number,
      min: 0,
    },
    totalUnits: {
      type: Number,
      min: 0,
    },
    urgencyLabel: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);
