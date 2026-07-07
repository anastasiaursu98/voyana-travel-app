import { Schema } from "mongoose";

const itineraryDayAccommodationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    nights: {
      type: String,
      required: true,
      trim: true,
    },
    meta: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    highlights: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
);

const itineraryDayTransportationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["flight", "rail", "transfer", "walk"],
      required: true,
      trim: true,
    },
    carrier: {
      type: String,
      trim: true,
    },
    route: {
      type: String,
      trim: true,
    },
    departure: {
      type: String,
      trim: true,
    },
    arrival: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    luggage: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const itineraryDayImageSchema = new Schema(
  {
    alt: {
      type: String,
      required: true,
      trim: true,
    },
    caption: {
      type: String,
      trim: true,
    },
    id: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const itineraryDaySchema = new Schema(
  {
    day: {
      type: Number,
      required: true,
      min: 1,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    stayLabel: {
      type: String,
      trim: true,
    },
    departure: {
      type: String,
      trim: true,
    },
    cityDescription: {
      type: String,
      trim: true,
    },
    image: {
      type: itineraryDayImageSchema,
      required: true,
    },
    accommodation: {
      type: itineraryDayAccommodationSchema,
      required: true,
    },
    transportation: {
      type: itineraryDayTransportationSchema,
      required: true,
    },
    activities: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
);

export const vacationPackageCategoryDetailsSchema = new Schema(
  {
    beachAccess: {
      type: String,
      trim: true,
    },
    distanceToBeachMeters: {
      type: Number,
      min: 0,
    },
    poolCount: {
      type: Number,
      min: 0,
    },
    resortFacilities: {
      type: [String],
      default: undefined,
    },
    kidsClub: {
      type: Boolean,
    },
    itinerary: {
      type: [String],
      default: undefined,
    },
    itineraryDays: {
      type: [itineraryDaySchema],
      default: undefined,
    },
    guideLanguages: {
      type: [String],
      default: undefined,
    },
    groupSize: {
      type: Number,
      min: 0,
    },
    pace: {
      type: String,
      trim: true,
    },
    includedAdmissions: {
      type: [String],
      default: undefined,
    },
    shipName: {
      type: String,
      trim: true,
    },
    cabinType: {
      type: String,
      trim: true,
    },
    route: {
      type: [String],
      default: undefined,
    },
    ports: {
      type: [String],
      default: undefined,
    },
    embarkationPort: {
      type: String,
      trim: true,
    },
    disembarkationPort: {
      type: String,
      trim: true,
    },
    skiArea: {
      type: String,
      trim: true,
    },
    distanceToLiftMeters: {
      type: Number,
      min: 0,
    },
    liftPassIncluded: {
      type: Boolean,
    },
    equipmentRentalIncluded: {
      type: Boolean,
    },
    difficulty: {
      type: String,
      trim: true,
    },
    neighborhood: {
      type: String,
      trim: true,
    },
    centralLocation: {
      type: Boolean,
    },
    publicTransportAccess: {
      type: Boolean,
    },
    includedTickets: {
      type: [String],
      default: undefined,
    },
    recommendedStayStyle: {
      type: String,
      trim: true,
    },
    spaAccessIncluded: {
      type: Boolean,
    },
    treatmentsIncluded: {
      type: [String],
      default: undefined,
    },
    wellnessProgram: {
      type: String,
      trim: true,
    },
    adultsOnly: {
      type: Boolean,
    },
    familyRooms: {
      type: Boolean,
    },
    childAgeBands: {
      type: [String],
      default: undefined,
    },
    childPricing: {
      type: String,
      trim: true,
    },
    babysittingAvailable: {
      type: Boolean,
    },
    fitnessLevel: {
      type: String,
      trim: true,
    },
    equipmentIncluded: {
      type: Boolean,
    },
    guideIncluded: {
      type: Boolean,
    },
    permitsIncluded: {
      type: Boolean,
    },
  },
  { _id: false },
);
