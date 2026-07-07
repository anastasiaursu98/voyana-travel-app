import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink } from "react-router-dom";
import { routes } from "../../../../app/router/routes";
import { homeImages } from "../../constants/homeImages";
import { OnboardingSectionShell } from "../shared/OnboardingSectionShell";

export function FinalCtaSection() {
  return (
    <OnboardingSectionShell
      tone="dark"
      backgroundImage={homeImages.boraBoraLagoon}
      backgroundOverlayClassName="bg-[linear-gradient(180deg,rgb(var(--voyana-rgb-background-dark)/0.42)_0%,rgb(var(--voyana-rgb-background-dark)/0.72)_76%,rgb(var(--voyana-rgb-background-dark)/0.88)_100%)]"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-black uppercase leading-none tracking-normal text-[rgb(var(--voyana-rgb-accent-warm)/0.94)]">
          Find your fit
        </p>
        <h2 className="mt-3 text-[2.35rem] font-bold leading-[1.05] tracking-normal text-(--voyana-color-white) sm:text-[3rem] lg:text-[3.35rem]">
          Still not sure where to go?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-8 text-[rgb(var(--voyana-rgb-white)/0.84)] sm:text-lg sm:leading-9">
          Start with your mood, budget, and available dates. Voyana will help
          narrow it down.
        </p>
        <RouterLink
          to={routes.vacationPackages}
          className="mt-8 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-(--voyana-color-button-primary) px-7 text-sm font-black text-(--voyana-color-button-primary-text) no-underline shadow-[0_14px_32px_rgb(var(--voyana-rgb-button-primary)/0.28)] transition hover:-translate-y-0.5 hover:bg-(--voyana-color-button-primary-hover) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-button-primary)/0.34)]"
        >
          Find my vacation
          <ArrowForwardRoundedIcon fontSize="small" />
        </RouterLink>
      </div>
    </OnboardingSectionShell>
  );
}
