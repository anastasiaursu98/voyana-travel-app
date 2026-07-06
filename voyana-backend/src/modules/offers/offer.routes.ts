import express from "express";
import {
  getAllOffers,
  getCategories,
  getOfferById,
  getTypes,
} from "./offer.controllers";

const router = express.Router();

router.get("/", getAllOffers);

router.get("/categories", getCategories);

router.get("/types", getTypes);

router.get("/:offerId/:offerCode", getOfferById);

router.get("/:offerId", getOfferById);

export default router;
