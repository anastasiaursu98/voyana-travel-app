import { AppTypography } from "../../../../shared/ui";
import { SectionHeader } from "../../../../shared/components/SectionHeader";
import { homeImages } from "../../constants/homeImages";
import { OnboardingCard } from "../shared/OnboardingCard";
import { OnboardingSectionShell } from "../shared/OnboardingSectionShell";
import { planningSteps } from "./howItWorks.content";

export function HowItWorksSection() {
  return (
    <OnboardingSectionShell
      tone="dark"
      backgroundImage={homeImages.africaSafari}
      backgroundOverlayClassName="bg-[linear-gradient(90deg,rgb(var(--voyana-rgb-background-dark)/0.82)_0%,rgb(var(--voyana-rgb-background-dark)/0.62)_50%,rgb(var(--voyana-rgb-background-dark)/0.38)_100%)]"
    >
      <SectionHeader
        eyebrow="How it works"
        title="Plan faster in three steps"
        description="Move from a broad travel idea to a shortlist you can compare without opening ten different tabs."
        titleSize="large"
        titleTransform="none"
        inverse
      />

      <div className="mt-9 grid gap-4 md:grid-cols-3">
        {planningSteps.map((step, index) => (
          <OnboardingCard
            key={step.title}
            tone="darkGlass"
            className="p-5 sm:p-6"
          >
            <span className="grid size-11 place-items-center rounded-(--voyana-radius-pill) bg-[rgb(var(--voyana-rgb-accent-warm)/0.94)] text-base font-black text-(--voyana-color-button-primary-text)">
              {index + 1}
            </span>
            <AppTypography variant="cardTitle" className="mt-5 text-(--voyana-color-white)">
              {step.title}
            </AppTypography>
            <p className="mt-3 text-sm leading-6 text-[rgb(var(--voyana-rgb-white)/0.78)]">
              {step.description}
            </p>
          </OnboardingCard>
        ))}
      </div>
    </OnboardingSectionShell>
  );
}
