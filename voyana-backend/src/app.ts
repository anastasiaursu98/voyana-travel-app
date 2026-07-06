import cors from "cors";
import express from "express";
import authRoutes from "./modules/auth/auth.routes";

import destinationRoutes from "./modules/destinations/destination.routes";
import offerRoutes from "./modules/offers/offer.routes";

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

app.use(express.json());

app.use("/api/destinations", destinationRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/auth", authRoutes);

export default app;
