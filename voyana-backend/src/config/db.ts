import mongoose from "mongoose";

export const connectDB = async (connectionString: string): Promise<void> => {
  try {
    const connection = await mongoose.connect(connectionString);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
