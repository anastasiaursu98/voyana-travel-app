import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { routes } from "../../../app/router/routes";
import { PublicContentContainer } from "../../../shared/components/PublicContentContainer";
import { AppButton } from "../../../shared/ui";
import { homeImages } from "../../home/constants/homeImages";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden bg-(--voyana-color-background-dark) text-(--voyana-color-white)">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={homeImages.boraBoraLagoon}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgb(var(--voyana-rgb-background-dark)/0.94)_0%,rgb(var(--voyana-rgb-background-dark)/0.82)_40%,rgb(var(--voyana-rgb-background-dark)/0.62)_100%)]" />
        {/* Warm teal brand tint */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(135deg,rgb(var(--voyana-rgb-accent-teal-strong)/0.28)_0%,transparent_55%)]"
        />
      </div>

      <PublicContentContainer className="relative z-10 flex min-h-screen flex-col justify-center py-24 pt-32">
        <div className="max-w-2xl">
          {/* Large decorative 404 */}
          <div className="relative mb-2 select-none" aria-hidden="true">
            <span className="block font-black leading-none tracking-tight text-[clamp(7rem,20vw,13rem)] text-[rgb(var(--voyana-rgb-white)/0.04)]">
              404
            </span>
            <span className="absolute inset-0 flex items-center text-[clamp(0.65rem,1.4vw,0.875rem)] font-black uppercase tracking-widest text-(--voyana-color-accent-teal)">
              404 — Page not found
            </span>
          </div>

          <h1 className="mt-1 text-4xl font-black leading-[1.06] text-(--voyana-color-white) sm:text-5xl lg:text-[3.5rem]">
            This destination
            <br className="hidden sm:block" /> doesn't exist
          </h1>

          <p className="mt-5 max-w-lg text-base font-medium leading-7 text-[rgb(var(--voyana-rgb-text-inverse-muted)/0.82)] sm:text-lg">
            The page may have moved, the link may be incomplete, or the offer is
            no longer accessible. Let's get you back on track.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppButton
              component={RouterLink}
              startIcon={<HomeRoundedIcon fontSize="small" />}
              to={routes.home}
            >
              Go home
            </AppButton>
            <AppButton
              intent="secondary"
              startIcon={<ArrowBackRoundedIcon fontSize="small" />}
              surface="dark"
              type="button"
              onClick={() => navigate(-1)}
            >
              Go back
            </AppButton>
          </div>

          {/* Quick navigation cards */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <RouterLink
              to={`${routes.home}#offers`}
              className="group flex min-h-24 items-center gap-4 rounded-lg border border-[rgb(var(--voyana-rgb-white)/0.1)] bg-[rgb(var(--voyana-rgb-white)/0.05)] p-4 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[rgb(var(--voyana-rgb-accent-teal)/0.52)] hover:bg-[rgb(var(--voyana-rgb-white)/0.09)] focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.28)]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[rgb(var(--voyana-rgb-accent-teal-strong)/0.72)] text-(--voyana-color-accent-teal) ring-1 ring-[rgb(var(--voyana-rgb-accent-teal)/0.32)] transition group-hover:bg-[rgb(var(--voyana-rgb-accent-teal-strong)/0.9)]">
                <LocalOfferRoundedIcon fontSize="small" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-black text-(--voyana-color-white)">
                  Current offers
                </span>
                <span className="mt-1 block text-sm font-medium leading-5 text-[rgb(var(--voyana-rgb-text-inverse-muted)/0.72)]">
                  Browse available travel deals
                </span>
              </span>
            </RouterLink>

            <RouterLink
              to={`${routes.home}#destinations`}
              className="group flex min-h-24 items-center gap-4 rounded-lg border border-[rgb(var(--voyana-rgb-white)/0.1)] bg-[rgb(var(--voyana-rgb-white)/0.05)] p-4 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[rgb(var(--voyana-rgb-accent-teal)/0.52)] hover:bg-[rgb(var(--voyana-rgb-white)/0.09)] focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.28)]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[rgb(var(--voyana-rgb-accent-teal-strong)/0.72)] text-(--voyana-color-accent-teal) ring-1 ring-[rgb(var(--voyana-rgb-accent-teal)/0.32)] transition group-hover:bg-[rgb(var(--voyana-rgb-accent-teal-strong)/0.9)]">
                <ExploreRoundedIcon fontSize="small" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-black text-(--voyana-color-white)">
                  Destinations
                </span>
                <span className="mt-1 block text-sm font-medium leading-5 text-[rgb(var(--voyana-rgb-text-inverse-muted)/0.72)]">
                  Find a place to start your journey
                </span>
              </span>
            </RouterLink>
          </div>
        </div>
      </PublicContentContainer>
    </section>
  );
}
