import { createElement, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { withRouteFallback } from "../../../app/router/withRouteFallback";
import { managementPaths } from "./management.paths";

const OffersPage = lazy(() =>
  import("../offers/pages/OffersPage").then((module) => ({
    default: module.OffersPage,
  })),
);

const AddOfferPage = lazy(() =>
  import("../offers/pages/AddOfferPage").then((module) => ({
    default: module.AddOfferPage,
  })),
);

const UsersPage = lazy(() =>
  import("../users/pages/UsersPage").then((module) => ({
    default: module.UsersPage,
  })),
);

export const managementRoutes: RouteObject[] = [
  {
    path: managementPaths.offers,
    element: withRouteFallback(createElement(OffersPage)),
  },
  {
    path: managementPaths.addOffer,
    element: withRouteFallback(createElement(AddOfferPage)),
  },
  {
    path: managementPaths.users,
    element: withRouteFallback(createElement(UsersPage)),
  },
];
