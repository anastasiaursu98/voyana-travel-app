import { createElement, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { withRouteFallback } from "../../../app/router/withRouteFallback";
import { offersPaths } from "./offers.paths";

const ListViewOffersPage = lazy(() =>
  import("../pages/OffersPage").then((module) => ({
    default: module.OffersPage,
  })),
);

const AllInclusiveBeachResortOfferDetailsPage = lazy(() =>
  import("../pages/AllInclusiveBeachResortOfferDetailsPage").then((module) => ({
    default: module.AllInclusiveBeachResortOfferDetailsPage,
  })),
);

export const offersRoutes: RouteObject[] = [
  {
    path: offersPaths.offers,
    element: withRouteFallback(createElement(ListViewOffersPage)),
  },
  {
    path: offersPaths.allInclusiveBeachResortOfferDetails,
    element: withRouteFallback(
      createElement(AllInclusiveBeachResortOfferDetailsPage),
    ),
  },
  {
    path: offersPaths.offerDetails,
    element: withRouteFallback(
      createElement(AllInclusiveBeachResortOfferDetailsPage),
    ),
  },
];
