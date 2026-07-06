import mongoose, { type InferSchemaType } from "mongoose";
import { offerCategoriesSchema } from "../schemas/offerCategories.schemas";

export type OfferCategory = InferSchemaType<typeof offerCategoriesSchema>;

export default mongoose.model<OfferCategory>(
  "OfferCategory",
  offerCategoriesSchema,
);
