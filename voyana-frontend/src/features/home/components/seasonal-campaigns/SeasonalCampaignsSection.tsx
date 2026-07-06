import { SectionHeader } from "../../../../shared/components/SectionHeader";
import { homeImages } from "../../constants/homeImages";
import { OnboardingCard } from "../shared/OnboardingCard";
import { OnboardingPill } from "../shared/OnboardingPill";
import { OnboardingSectionShell } from "../shared/OnboardingSectionShell";
import { seasonalCampaigns } from "./seasonalCampaigns.content";

export function SeasonalCampaignsSection() {
  return (
    <OnboardingSectionShell
      tone="dark"
      backgroundImage={homeImages.goldenGate}
      backgroundOverlayClassName="bg-[linear-gradient(90deg,rgb(var(--voyana-rgb-background-dark)/0.78)_0%,rgb(var(--voyana-rgb-background-dark)/0.56)_46%,rgb(var(--voyana-rgb-background-dark)/0.26)_100%)]"
      className="py-16 sm:py-20 lg:py-24"
      contentClassName="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-12"
    >
      <SectionHeader
        eyebrow="Seasonal campaigns"
        title="Seasonal offers with clear timing"
        description="Campaign cards mirror the seasonal offer types: last minute, early booking, summer specials, winter escapes, and holiday packages."
        inverse
        titleSize="large"
        descriptionSize="large"
        titleTransform="none"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {seasonalCampaigns.map((campaign) => (
          <OnboardingCard key={campaign.title} tone="darkGlass" className="p-5">
            <OnboardingPill tone="sun" className="uppercase">
              {campaign.tag}
            </OnboardingPill>
            <h3 className="mt-5 text-2xl font-black text-(--voyana-color-white)">
              {campaign.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[rgb(var(--voyana-rgb-text-inverse-muted)/0.9)]">
              {campaign.description}
            </p>
          </OnboardingCard>
        ))}
      </div>
    </OnboardingSectionShell>
  );
}
