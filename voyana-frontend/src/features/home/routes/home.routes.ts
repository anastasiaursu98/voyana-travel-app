import { createElement, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { withRouteFallback } from "../../../app/router/withRouteFallback";

const HomePage = lazy(() =>
  import("../pages/HomePage").then((module) => ({
    default: module.HomePage,
  })),
);

export const homeRoutes: RouteObject[] = [
  {
    index: true,
    element: withRouteFallback(createElement(HomePage)),
  },
];
