import { routes } from "../../router/routes";

export const PUBLIC_FOOTER_LINKS = [
  {
    title: "Explore",
    links: [
      {
        label: "Destinations",
        to: routes.destinations,
      },
      { label: "Featured packages", to: routes.vacationPackages },
      { label: "Travel deals", to: routes.vacationPackages },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Voyana", to: routes.home },
      { label: "Contact", to: routes.home },
      { label: "Support", to: routes.home },
    ],
  },
] as const;
