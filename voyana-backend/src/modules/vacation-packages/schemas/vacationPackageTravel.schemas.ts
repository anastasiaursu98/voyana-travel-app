import { Schema } from "mongoose";

export const vacationPackageInclusionsSchema = new Schema(
  {
    mealPlan: {
      type: String,
      enum: [
        "ROOM_ONLY",
        "BREAKFAST",
        "HALF_BOARD",
        "FULL_BOARD",
        "ALL_INCLUSIVE",
        "SELECTED_MEALS",
      ],
      trim: true,
      default: "SELECTED_MEALS",
      index: true,
    },
    transport: {
      type: [String],
      default: [],
    },
    services: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
);

export const vacationPackageAccommodationSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "HOTEL",
        "RESORT",
        "APARTMENT",
        "VILLA",
        "CRUISE_CABIN",
        "CHALET",
        "LODGE",
      ],
      trim: true,
      default: "HOTEL",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    roomType: {
      type: String,
      trim: true,
    },
    boardBasis: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

export const vacationPackageTransportSchema = new Schema(
  {
    departureCity: {
      type: String,
      trim: true,
    },
    arrivalCity: {
      type: String,
      trim: true,
    },
    included: {
      type: Boolean,
      default: false,
    },
    types: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
);

export const vacationPackagePoliciesSchema = new Schema(
  {
    cancellation: {
      type: String,
      trim: true,
    },
    payment: {
      type: String,
      trim: true,
    },
    children: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);
