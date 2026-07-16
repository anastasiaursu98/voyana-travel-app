import { SectionHeader } from "../../../../shared/components/SectionHeader";

export function HeroIntro() {
  return (
    <div className="w-full max-w-152 min-w-0 text-left">
      <SectionHeader
        eyebrow="Curated vacation packages / Clear prices / Easier decisions"
        title="Find the vacation that fits your mood, budget, and dates."
        description="Tell us what kind of trip you want, and Voyana helps you compare beach escapes, city breaks, family holidays, luxury stays, and last-minute deals in one place."
        titleAs="h1"
        titleSize="display"
        titleTransform="none"
        inverse
      />
    </div>
  );
}
