import { authPaths } from "../../features/auth/routes/auth.paths";
import { destinationsPaths } from "../../features/destinations/routes/destinations.paths";
import { homePaths } from "../../features/home/routes/home.paths";
import { vacationPackagesPaths } from "../../features/vacation-packages/routes/vacationPackages.paths";

export const routes = {
  ...homePaths,
  ...vacationPackagesPaths,
  ...authPaths,
  ...destinationsPaths,
} as const;
