import { authPaths } from "../../features/auth/routes/auth.paths";
import { destinationsPaths } from "../../features/destinations/routes/destinations.paths";
import { homePaths } from "../../features/home/routes/home.paths";
import { offersPaths } from "../../features/offers/routes/offers.paths";

export const routes = {
  ...homePaths,
  ...offersPaths,
  ...authPaths,
  ...destinationsPaths,
} as const;
