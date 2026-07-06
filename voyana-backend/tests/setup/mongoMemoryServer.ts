import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer | undefined;

export const connectTestDB = async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: {
      ip: "127.0.0.1",
    },
  });

  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
};

export const clearTestDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    return;
  }

  const collections = mongoose.connection.collections;

  await Promise.all(
    Object.values(collections).map((collection) => collection.deleteMany({})),
  );
};

export const disconnectTestDB = async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  await mongoServer?.stop();
  mongoServer = undefined;
};
