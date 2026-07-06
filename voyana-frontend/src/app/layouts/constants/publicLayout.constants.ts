import { routes } from "../../router/routes";

export const PUBLIC_NAV_ITEMS = [
  { label: "Home", to: routes.home },
  { label: "Destinations", to: routes.destinations },
  { label: "Offers", to: routes.offers },
  { label: "About", to: routes.home },
  { label: "Contact", to: routes.home },
] as const;

export const PUBLIC_FOOTER_LINKS = [
  {
    title: "Explore",
    links: [
      {
        label: "Destinations",
        to: routes.destinations,
      },
      { label: "Special offers", to: routes.offers },
      { label: "Travel deals", to: routes.offers },
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
