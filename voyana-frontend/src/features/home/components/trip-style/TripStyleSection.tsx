import { Link as RouterLink } from "react-router-dom";
import { SectionHeader } from "../../../../shared/components/SectionHeader";
import { ResponsiveImage } from "../../../../shared/components/ResponsiveImage";
import { useHomeOfferCategoryLinks } from "../../hooks/useHomeOfferCategoryLinks";
import { homeImages } from "../../constants/homeImages";
import { OnboardingCard } from "../shared/OnboardingCard";
import { OnboardingSectionShell } from "../shared/OnboardingSectionShell";

export function TripStyleSection() {
  const { categoriesError, categoriesStatus, offerCategoryLinks } =
    useHomeOfferCategoryLinks(6);
  const isLoading = categoriesStatus === "idle" || categoriesStatus === "loading";

  return (
    <OnboardingSectionShell tone="white" className="pt-16 sm:pt-20">
      <SectionHeader
        eyebrow="Trip style"
        title="What kind of vacation are you looking for?"
        description="Start with the experience you want, not just the destination."
        titleSize="large"
        titleTransform="none"
      />

      <div className="mt-9 grid gap-5 lg:grid-cols-[minmax(18rem,0.36fr)_minmax(0,0.64fr)]">
        <article className="overflow-hidden rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.88)] bg-(--voyana-color-white) shadow-[0_18px_45px_rgb(var(--voyana-rgb-text-strong)/0.08)]">
          <div className="aspect-[4/3] overflow-hidden bg-(--voyana-color-background-section)">
            <ResponsiveImage
              src={homeImages.europeCoastalTown}
              alt="Coastal town with warm light"
            />
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-normal text-(--voyana-color-accent-teal-strong)">
              Start here
            </p>
            <h3 className="mt-3 text-2xl font-black leading-tight text-(--voyana-color-text-strong)">
              Choose the feeling first.
            </h3>
            <p className="mt-3 text-sm leading-6 text-[rgb(var(--voyana-rgb-text-muted)/0.94)]">
              Voyana narrows down options by mood, comfort level, budget, and
              timing so the shortlist feels easier to compare.
            </p>
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          {offerCategoryLinks.length > 0 ? (
            offerCategoryLinks.map((category, index) => (
              <OnboardingCard
                key={category.value}
                className="p-5 shadow-[0_12px_30px_rgb(var(--voyana-rgb-text-strong)/0.05)]"
              >
                <RouterLink
                  to={category.to}
                  className="block h-full rounded-md focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.18)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-black uppercase tracking-normal ${
                          index % 2 === 0
                            ? "text-(--voyana-color-accent-teal-strong)"
                            : "text-[rgb(var(--voyana-rgb-accent-warm)/0.94)]"
                        }`}
                      >
                        Category
                      </p>
                      <h3 className="mt-3 text-xl font-black text-(--voyana-color-text-strong)">
                        {category.label}
                      </h3>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-(--voyana-color-background-section) text-sm font-black text-(--voyana-color-text-strong)">
                      {category.label.charAt(0)}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[rgb(var(--voyana-rgb-text-muted)/0.94)]">
                    {category.description}
                  </p>
                </RouterLink>
              </OnboardingCard>
            ))
          ) : (
            <p className="rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] bg-(--voyana-color-background-section) p-5 text-sm font-bold text-(--voyana-color-text-muted) sm:col-span-2">
              {isLoading
                ? "Loading offer categories..."
                : categoriesError ?? "No offer categories available."}
            </p>
          )}
        </div>
      </div>
    </OnboardingSectionShell>
  );
}
