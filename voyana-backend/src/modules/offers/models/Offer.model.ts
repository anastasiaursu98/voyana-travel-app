import mongoose, { type InferSchemaType } from "mongoose";
import { offerSchema } from "../schemas/offer.schemas";

export type Offer = InferSchemaType<typeof offerSchema>;

export default mongoose.model<Offer>("Offer", offerSchema);
