import { createElement, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { withRouteFallback } from "../../../app/router/withRouteFallback";
import { vacationPackagesPaths } from "./vacationPackages.paths";

const ListViewVacationPackagesPage = lazy(() =>
  import("../pages/VacationPackagesPage").then((module) => ({
    default: module.VacationPackagesPage,
  })),
);

const VacationPackageDetailsPage = lazy(() =>
  import("../pages/VacationPackageDetailsPage").then((module) => ({
    default: module.VacationPackageDetailsPage,
  })),
);

export const vacationPackagesRoutes: RouteObject[] = [
  {
    path: vacationPackagesPaths.vacationPackages,
    element: withRouteFallback(createElement(ListViewVacationPackagesPage)),
  },
  {
    path: vacationPackagesPaths.vacationPackageDetails,
    element: withRouteFallback(createElement(VacationPackageDetailsPage)),
  },
];
