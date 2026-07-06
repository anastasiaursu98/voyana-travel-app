import type {
  AllInclusiveMealPlan,
  AllInclusiveRatePlan,
  AllInclusiveRoomType,
  AllInclusiveTransferOption,
} from "../types/allInclusiveOffer.types";

export const allInclusiveRoomTypeOptions = [
  {
    label: "Red Sea-view double room",
    value: "sea-view-double",
    description: "1 double bed, balcony, Red Sea-facing view",
  },
  {
    label: "Lagoon-view twin room",
    value: "lagoon-view-twin",
    description: "2 single beds, lagoon or pool-facing view",
  },
  {
    label: "Family resort room",
    value: "family-room",
    description: "Larger room with double bed and sofa bed",
  },
] satisfies readonly AllInclusiveRoomType[];

export const allInclusiveMealPlanOptions = [
  {
    label: "All inclusive",
    value: "all-inclusive",
    description: "Meals, snacks, and selected local drinks included",
  },
  {
    label: "Ultra all inclusive",
    value: "ultra-all-inclusive",
    description: "All inclusive with expanded drinks and late snacks",
  },
  {
    label: "Premium drinks upgrade",
    value: "premium-drinks",
    description: "Selected imported drinks added to the package",
  },
  {
    label: "Family all inclusive",
    value: "family-all-inclusive",
    description: "All inclusive with child-friendly meal options",
  },
] satisfies readonly AllInclusiveMealPlan[];

export const allInclusiveTransferOptions = [
  {
    label: "Shared Hurghada airport transfer",
    value: "shared-transfer",
    description: "Return shuttle between Hurghada airport and resort",
  },
  {
    label: "Private transfer",
    value: "private-transfer",
    description: "Private return car transfer from Hurghada airport",
  },
  {
    label: "No transfer",
    value: "no-transfer",
    description: "Travel from the airport independently",
  },
] satisfies readonly AllInclusiveTransferOption[];

export const allInclusiveRatePlanOptions = [
  {
    label: "Free cancellation",
    value: "free-cancellation",
    description: "Cancel before the package deadline with no charge",
  },
  {
    label: "Non-refundable",
    value: "non-refundable",
    description: "Lower price, no refund after booking",
  },
] satisfies readonly AllInclusiveRatePlan[];
