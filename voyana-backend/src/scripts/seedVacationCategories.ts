import "dotenv/config";
import mongoose from "mongoose";
import VacationCategory from "../modules/vacation-packages/models/VacationCategory.model";
import { vacationCategorySeeds } from "./data/vacationCategorySeeds";

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from the environment");
  }

  await mongoose.connect(mongoUri);
};

const seedVacationCategories = async () => {
  await connectToDatabase();

  let createdCount = 0;
  let updatedCount = 0;

  for (const categorySeed of vacationCategorySeeds) {
    const result = await VacationCategory.updateOne(
      { value: categorySeed.value },
      { $set: categorySeed },
      { upsert: true },
    );

    if (result.upsertedCount > 0) {
      createdCount += result.upsertedCount;
    } else if (result.modifiedCount > 0) {
      updatedCount += result.modifiedCount;
    }
  }

  const activeCategoryValues = vacationCategorySeeds.map((category) => category.value);
  const deleteResult = await VacationCategory.deleteMany({
    value: { $nin: activeCategoryValues },
  });

  console.log(
    `Seeded vacation categories successfully. Created: ${createdCount}, updated: ${updatedCount}, deleted: ${deleteResult.deletedCount}.`,
  );
};

seedVacationCategories()
  .catch((error) => {
    console.error("Failed to seed vacation categories:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
