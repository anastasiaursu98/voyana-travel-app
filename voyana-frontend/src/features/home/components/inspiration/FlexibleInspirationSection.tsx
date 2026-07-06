import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { SectionHeader } from "../../../../shared/components/SectionHeader";
import { OnboardingCard } from "../shared/OnboardingCard";
import { OnboardingPill } from "../shared/OnboardingPill";
import { OnboardingSectionShell } from "../shared/OnboardingSectionShell";
import { flexibleBudgetIdeas } from "./flexibleInspiration.content";

export function FlexibleInspirationSection() {
  return (
    <OnboardingSectionShell tone="white" className="py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-14">
        <div className="max-w-2xl">
          <SectionHeader
            eyebrow="Flexible inspiration"
            title="Match a budget to an offer type"
            description="Start with a budget and compare the offer categories that fit: seasonal deals, all-inclusive resorts, family holidays, or premium escapes."
            titleSize="large"
            titleTransform="none"
          />

          <div className="mt-7 flex flex-wrap gap-3">
            {flexibleBudgetIdeas.map((idea) => (
              <button
                key={idea.budget}
                type="button"
                className="transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.2)]"
              >
                <OnboardingPill
                  tone="teal"
                  className="block px-4 py-2.5 text-sm"
                >
                  {idea.budget}
                </OnboardingPill>
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <div className="rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.88)] bg-(--voyana-color-background-section) p-3 shadow-[0_24px_70px_rgb(var(--voyana-rgb-text-strong)/0.1)]">
            <div className="rounded-lg bg-(--voyana-color-white) p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="flex min-h-16 min-w-0 flex-1 flex-col justify-center rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.74)] bg-[rgb(var(--voyana-rgb-background-input)/0.72)] px-4">
                  <span className="text-[11px] font-black uppercase leading-none tracking-normal text-(--voyana-color-text-strong)">
                    Ask Voyana
                  </span>
                  <input
                    type="text"
                    defaultValue="All inclusive Egypt around EUR 800"
                    className="mt-2 min-w-0 bg-transparent text-base font-black text-(--voyana-color-text-primary) outline-none placeholder:text-(--voyana-color-text-muted) sm:text-lg"
                  />
                </label>
                <button
                  type="button"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-[rgb(var(--voyana-rgb-text-strong)/0.28)] bg-transparent px-6 text-sm font-black text-(--voyana-color-text-strong) transition hover:-translate-y-0.5 hover:border-[rgb(var(--voyana-rgb-text-strong)/0.52)] focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-text-strong)/0.14)]"
                >
                  <SearchRoundedIcon fontSize="small" />
                  Search
                </button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {flexibleBudgetIdeas.map((idea) => (
                  <OnboardingCard key={idea.budget} className="p-4">
                    <p className="text-sm font-black text-(--voyana-color-text-muted)">
                      {idea.budget}
                    </p>
                    <h3 className="mt-3 text-base font-black text-(--voyana-color-text-strong)">
                      {idea.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[rgb(var(--voyana-rgb-text-muted)/0.92)]">
                      {idea.description}
                    </p>
                  </OnboardingCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </OnboardingSectionShell>
  );
}
