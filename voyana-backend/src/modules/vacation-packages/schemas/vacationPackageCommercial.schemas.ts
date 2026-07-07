import { Schema } from "mongoose";

export const vacationPackageCommercialSchema = new Schema(
  {
    campaignType: {
      type: String,
      enum: [
        "STANDARD",
        "LAST_MINUTE",
        "EARLY_BOOKING",
        "SEASONAL_DEAL",
        "LIMITED_AVAILABILITY",
        "SPECIAL_OFFER",
      ],
      trim: true,
      default: "STANDARD",
      index: true,
    },
    campaignLabel: {
      type: String,
      trim: true,
    },
    badges: {
      type: [String],
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
