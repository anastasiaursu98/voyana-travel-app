import { routes } from "../../../router/routes";

export const PUBLIC_NAV_ITEMS = [
  { label: "Home", to: routes.home },
  { label: "Destinations", to: routes.destinations },
  { label: "Vacation packages", to: routes.vacationPackages },
] as const;
