import express from "express";
import {
  getAllVacationPackages,
  getCategories,
  getVacationPackageById,
} from "./vacationPackage.controllers";

const router = express.Router();

router.get("/", getAllVacationPackages);

router.get("/categories", getCategories);

router.get("/:vacationPackageId/:vacationPackageCode", getVacationPackageById);

router.get("/:vacationPackageId", getVacationPackageById);

export default router;
