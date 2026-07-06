import { Link as RouterLink } from "react-router-dom";
import footerBackgroundImage from "../../assets/images/home/bora-bora-lagoon.webp";
import { PublicContentContainer } from "../../shared/components/PublicContentContainer";
import { VoyanaLogoMark } from "../../shared/components/VoyanaLogoMark";
import { routes } from "../router/routes";
import { PUBLIC_FOOTER_LINKS } from "./constants/publicLayout.constants";

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="relative isolate overflow-hidden bg-(--voyana-color-background-dark) py-12 text-(--voyana-color-white)"
    >
      <img
        src={footerBackgroundImage}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-bottom"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(var(--voyana-rgb-background-dark)/0.88)_0%,rgb(var(--voyana-rgb-background-dark)/0.94)_100%)]" />

      <PublicContentContainer className="relative z-10 grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto]">
        <div className="max-w-md">
          <RouterLink
            to={routes.home}
            className="inline-flex items-center gap-3 text-(--voyana-color-white) transition hover:text-(--voyana-color-text-inverse-muted) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.25)]"
            aria-label="Voyana home"
          >
            <VoyanaLogoMark sx={{ width: 42, height: 42 }} />
            <span className="text-2xl font-black leading-none tracking-normal">
              Voyana
            </span>
          </RouterLink>

          <p className="mt-5 text-sm leading-6 text-[rgb(var(--voyana-rgb-text-inverse-muted)/0.82)]">
            Curated stays, flexible destination planning, and seasonal travel
            offers for easier booking.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {PUBLIC_FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-black uppercase tracking-normal text-(--voyana-color-white)">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <RouterLink
                      to={link.to}
                      className="text-sm font-bold text-[rgb(var(--voyana-rgb-text-inverse-muted)/0.78)] transition hover:text-(--voyana-color-white) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.2)]"
                    >
                      {link.label}
                    </RouterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PublicContentContainer>

      <PublicContentContainer className="relative z-10 mt-10 flex flex-col gap-3 border-t border-[rgb(var(--voyana-rgb-text-inverse-muted)/0.16)] pt-6 text-sm font-bold text-[rgb(var(--voyana-rgb-text-inverse-muted)/0.62)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {currentYear} Voyana. All rights reserved.</p>
        <p>Travel planning made simpler.</p>
      </PublicContentContainer>
    </footer>
  );
}
