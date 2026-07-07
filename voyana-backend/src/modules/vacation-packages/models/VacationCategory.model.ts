import mongoose, { type InferSchemaType } from "mongoose";
import { vacationCategoriesSchema } from "../schemas/vacationCategories.schemas";

export type VacationCategory = InferSchemaType<typeof vacationCategoriesSchema>;

export default mongoose.model<VacationCategory>(
  "VacationCategory",
  vacationCategoriesSchema,
);
