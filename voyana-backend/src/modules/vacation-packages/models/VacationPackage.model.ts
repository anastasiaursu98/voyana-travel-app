import mongoose, { type InferSchemaType } from "mongoose";
import { vacationPackageSchema } from "../schemas/vacationPackage.schemas";

export type VacationPackage = InferSchemaType<typeof vacationPackageSchema>;

export default mongoose.model<VacationPackage>("VacationPackage", vacationPackageSchema);
