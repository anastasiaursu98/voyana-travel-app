import "dotenv/config";
import app from "./app";

import { connectDB } from "./config/db";

const PORT = Number(process.env.PORT) || 5001;
const mongoUri = process.env.MONGODB_URI;

const startServer = async () => {
  if (!mongoUri) {
    console.error("MONGODB_URI is missing. Add it to your .env file.");
    process.exit(1);
  }

  await connectDB(mongoUri);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
