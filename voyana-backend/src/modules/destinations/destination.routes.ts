import express from "express";
import { getAllDestinations } from "./destination.controllers";

const router = express.Router();

router.get("/", getAllDestinations);

export default router;
