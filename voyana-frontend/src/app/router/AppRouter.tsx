import { createElement, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { authRoutes } from "../../features/auth/routes/auth.routes";
import { destinationsRoutes } from "../../features/destinations/routes/destinations.routes";
import { homeRoutes } from "../../features/home/routes/home.routes";
import { managementRoutes } from "../../features/management/routes/management.routes";
import { vacationPackagesRoutes } from "../../features/vacation-packages/routes/vacationPackages.routes";
import { routes } from "./routes";
import { withRouteFallback } from "./withRouteFallback";

const PublicLayout = lazy(() =>
  import("../layouts/PublicLayout").then((module) => ({
    default: module.PublicLayout,
  })),
);

const NotFoundPage = lazy(() =>
  import("../../features/not-found/pages/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  })),
);

const router = createBrowserRouter([
  {
    path: routes.home,
    element: withRouteFallback(createElement(PublicLayout)),
    children: [
      ...homeRoutes,
      ...vacationPackagesRoutes,
      ...destinationsRoutes,
      ...managementRoutes,
      {
        path: "*",
        element: withRouteFallback(createElement(NotFoundPage)),
      },
    ],
  },
  ...authRoutes,
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
