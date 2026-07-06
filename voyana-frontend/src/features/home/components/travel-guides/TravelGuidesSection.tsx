import { ResponsiveImage } from "../../../../shared/components/ResponsiveImage";
import { SectionHeader } from "../../../../shared/components/SectionHeader";
import { OnboardingCard } from "../shared/OnboardingCard";
import { OnboardingSectionShell } from "../shared/OnboardingSectionShell";
import { travelGuides } from "./travelGuides.content";

export function TravelGuidesSection() {
  return (
    <OnboardingSectionShell tone="white">
      <SectionHeader
        titleTransform="none"
        titleSize="large"
        eyebrow="Travel guides"
        title="Insights before booking"
        description="Editorial cards support destination confidence with timing, local highlights, and planning context."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {travelGuides.map((guide) => (
          <OnboardingCard key={guide.title} className="overflow-hidden">
            <div className="aspect-[16/9] overflow-hidden">
              <ResponsiveImage src={guide.imageUrl} alt={guide.title} />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-black text-(--voyana-color-text-strong)">
                {guide.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[rgb(var(--voyana-rgb-text-muted)/0.92)]">
                {guide.description}
              </p>
            </div>
          </OnboardingCard>
        ))}
      </div>
    </OnboardingSectionShell>
  );
}
