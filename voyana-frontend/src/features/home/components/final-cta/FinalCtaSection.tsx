import { AppTypography } from "../../../../shared/ui";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink } from "react-router-dom";
import { routes } from "../../../../app/router/routes";
import { AppButton } from "../../../../shared/ui";
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
        <AppTypography
          variant="sectionTitle"
          className="mt-4 tracking-normal text-(--voyana-color-white)"
        >
          Still not sure where to go?
        </AppTypography>
        <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-[rgb(var(--voyana-rgb-white)/0.84)] sm:text-lg sm:leading-9">
          Start with your mood, budget, and available dates. Voyana will help
          narrow it down.
        </p>
        <AppButton
          component={RouterLink}
          to={routes.vacationPackages}
          className="mt-8"
          endIcon={<ArrowForwardRoundedIcon fontSize="small" />}
        >
          Find my vacation
        </AppButton>
      </div>
    </OnboardingSectionShell>
  );
}
