import { createElement, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { withRouteFallback } from "../../../app/router/withRouteFallback";
import { offersPaths } from "./offers.paths";

const ListViewOffersPage = lazy(() =>
  import("../pages/OffersPage").then((module) => ({
    default: module.OffersPage,
  })),
);

const AllInclusiveOfferDetailsPage = lazy(() =>
  import("../pages/AllInclusiveOfferDetailsPage").then((module) => ({
    default: module.AllInclusiveOfferDetailsPage,
  })),
);

const OfferDetailsPage = lazy(() =>
  import("../pages/OfferDetailsPage").then((module) => ({
    default: module.OfferDetailsPage,
  })),
);

const TourTemplateOfferDetailsPage = lazy(() =>
  import("../pages/TourTemplateOfferDetailsPage").then((module) => ({
    default: module.TourTemplateOfferDetailsPage,
  })),
);

export const offersRoutes: RouteObject[] = [
  {
    path: offersPaths.offers,
    element: withRouteFallback(createElement(ListViewOffersPage)),
  },
  {
    path: offersPaths.tourTemplateOfferDetails,
    element: withRouteFallback(createElement(TourTemplateOfferDetailsPage)),
  },
  {
    path: offersPaths.allInclusiveOfferDetails,
    element: withRouteFallback(
      createElement(AllInclusiveOfferDetailsPage),
    ),
  },
  {
    path: offersPaths.offerDetails,
    element: withRouteFallback(createElement(OfferDetailsPage)),
  },
];
