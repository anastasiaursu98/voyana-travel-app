import express from "express";
import {
  getAllVacationPackages,
  getCategories,
  getFilterOptions,
  getVacationPackageById,
} from "./vacationPackage.controllers";

const router = express.Router();

router.get("/", getAllVacationPackages);

router.get("/filter-options", getFilterOptions);

router.get("/categories", getCategories);

router.get("/:vacationPackageId/:vacationPackageCode", getVacationPackageById);

router.get("/:vacationPackageId", getVacationPackageById);

export default router;
