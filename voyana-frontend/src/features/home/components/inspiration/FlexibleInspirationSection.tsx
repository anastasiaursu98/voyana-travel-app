import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink } from "react-router-dom";
import { routes } from "../../../../app/router/routes";
import { SectionHeader } from "../../../../shared/components/SectionHeader";
import { AppButton, AppTypography } from "../../../../shared/ui";
import { homeImages } from "../../constants/homeImages";
import { OnboardingCard } from "../shared/OnboardingCard";
import { OnboardingSectionShell } from "../shared/OnboardingSectionShell";
import { flexibleBudgetIdeas } from "./flexibleInspiration.content";

export function FlexibleInspirationSection() {
  return (
    <OnboardingSectionShell
      tone="dark"
      backgroundImage={homeImages.goldenGate}
      backgroundOverlayClassName="bg-[linear-gradient(90deg,rgb(var(--voyana-rgb-background-dark)/0.78)_0%,rgb(var(--voyana-rgb-background-dark)/0.58)_48%,rgb(var(--voyana-rgb-background-dark)/0.34)_100%)]"
      className="py-16 sm:py-20"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Budget inspiration"
          title="Start with your budget"
          description="Not sure where to go? Pick a budget and compare the best trip types that fit."
          titleSize="large"
          titleTransform="none"
          inverse
        />

        <AppButton
          component={RouterLink}
          to={routes.vacationPackages}
          className="w-fit"
          endIcon={<ArrowForwardRoundedIcon fontSize="small" />}
        >
          Explore by budget
        </AppButton>
      </div>

      <div className="mt-9 grid gap-4 md:grid-cols-3">
        {flexibleBudgetIdeas.map((idea, index) => (
          <OnboardingCard
            key={idea.budget}
            tone="darkGlass"
            className="relative overflow-hidden p-5 sm:p-6"
          >
            <span className="absolute right-5 top-5 text-5xl font-black leading-none text-[rgb(var(--voyana-rgb-white)/0.08)]">
              0{index + 1}
            </span>
            <p
              className={`relative text-sm font-black ${
                index === 1
                  ? "text-[rgb(var(--voyana-rgb-accent-warm)/0.94)]"
                  : "text-[rgb(var(--voyana-rgb-accent-teal)/0.92)]"
              }`}
            >
              {idea.budget}
            </p>
            <AppTypography
              variant="cardTitle"
              className="mt-3 text-(--voyana-color-white)"
            >
              {idea.title}
            </AppTypography>
            <p className="mt-3 text-sm leading-6 text-[rgb(var(--voyana-rgb-white)/0.78)]">
              {idea.description}
            </p>
          </OnboardingCard>
        ))}
      </div>
    </OnboardingSectionShell>
  );
}
