import mongoose, { type InferSchemaType } from "mongoose";
import { offerTypesSchema } from "../schemas/offerTypes.schemas";

export type OfferType = InferSchemaType<typeof offerTypesSchema>;

export default mongoose.model<OfferType>("OfferType", offerTypesSchema);
