import { SectionHeader } from "../../../../shared/components/SectionHeader";
import { OnboardingSectionShell } from "../shared/OnboardingSectionShell";

// const visibleOfferCategories = offerCategoryDefinitions.slice(0, 6);

export function OfferCategoriesSection() {
  return (
    <OnboardingSectionShell tone="white">
      <SectionHeader
        titleTransform="none"
        titleSize="large"
        eyebrow="Offer categories"
        title="Browse trips by offer type"
        description="Compare beach holidays, city breaks, adventure routes, luxury stays, family trips, and seasonal deals from the same offer taxonomy."
      />

      {/* <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {visibleOfferCategories.map((category) => {
          const presentation = offerCategoryPresentation[category.id];

          return (
            <OnboardingCard key={category.id} className="overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                <ResponsiveImage
                  src={presentation.imageUrl}
                  alt={category.label}
                />
              </div>
              <div className="p-5">
                <p className="text-sm font-black text-(--voyana-color-text-muted)">
                  {presentation.meta}
                </p>
                <h3 className="mt-2 text-xl font-black text-(--voyana-color-text-strong)">
                  {category.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[rgb(var(--voyana-rgb-text-muted)/0.94)]">
                  {category.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.subtypes.slice(0, 3).map((subtype) => (
                    <OnboardingPill key={subtype.id}>
                      {subtype.label}
                    </OnboardingPill>
                  ))}
                </div>
              </div>
            </OnboardingCard>
          );
        })}
      </div> */}
    </OnboardingSectionShell>
  );
}
