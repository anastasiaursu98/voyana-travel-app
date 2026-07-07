import { Schema } from "mongoose";

/**
 * Label/value fact displayed inside vacationPackage detail panels.
 * Used for practical vacationPackage information such as amenities and stay details.
 */
const detailFactSchema = new Schema(
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
    },
    icon: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

/**
 * Practical operational details for an vacationPackage.
 */
export const vacationPackageLogisticsSchema = new Schema(
  {
    amenities: {
      type: [detailFactSchema],
      default: [],
    },
    stayDetails: {
      type: [detailFactSchema],
      default: [],
    },
  },
  { _id: false },
);
