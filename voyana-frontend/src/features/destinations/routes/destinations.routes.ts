import { createElement, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { withRouteFallback } from "../../../app/router/withRouteFallback";
import { destinationsPaths } from "./destinations.paths";

const DestinationsPage = lazy(() =>
  import("../pages/DestinationsPage").then((module) => ({
    default: module.DestinationsPage,
  })),
);

export const destinationsRoutes: RouteObject[] = [
  {
    path: destinationsPaths.destinations,
    element: withRouteFallback(createElement(DestinationsPage)),
  },
];
