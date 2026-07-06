import { routes } from "../../router/routes";

export const PUBLIC_NAV_ITEMS = [
  { label: "Home", to: routes.home },
  { label: "Destinations", to: `${routes.destinations}#destinations` },
  { label: "Offers", to: `${routes.offers}#offers` },
  { label: "About", to: `${routes.home}#footer` },
  { label: "Contact", to: `${routes.home}#footer` },
] as const;

export const PUBLIC_FOOTER_LINKS = [
  {
    title: "Explore",
    links: [
      {
        label: "Destinations",
        to: `${routes.destinations}#destinations`,
      },
      { label: "Special offers", to: `${routes.offers}#offers` },
      { label: "Travel deals", to: `${routes.offers}#offers` },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Voyana", to: `${routes.home}#footer` },
      { label: "Contact", to: `${routes.home}#footer` },
      { label: "Support", to: `${routes.home}#footer` },
    ],
  },
] as const;
