import mongoose, { type InferSchemaType } from "mongoose";
import { destinationSchema } from "../schemas/destination.schemas";

export type Destination = InferSchemaType<typeof destinationSchema>;

export default mongoose.model<Destination>("Destination", destinationSchema);
