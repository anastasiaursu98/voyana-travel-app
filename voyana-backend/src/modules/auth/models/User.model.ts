import mongoose, { type InferSchemaType } from "mongoose";
import { userSchema } from "../schemas/user.schemas";

export type User = InferSchemaType<typeof userSchema>;

export default mongoose.model<User>("User", userSchema);
