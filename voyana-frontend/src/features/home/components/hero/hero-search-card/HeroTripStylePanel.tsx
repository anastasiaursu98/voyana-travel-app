import { tripStyleOptions } from "./heroSearchPanels.content";

export function HeroTripStylePanel() {
  return (
    <div className="p-4 sm:p-5">
      <p className="text-xs font-black text-(--voyana-color-text-strong)">
        Choose a travel mood
      </p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {tripStyleOptions.map((option) => (
          <button
            key={option.label}
            type="button"
            className="rounded-2xl border border-[rgb(var(--voyana-rgb-border-subtle)/0.78)] p-4 text-left transition hover:border-[rgb(var(--voyana-rgb-accent-warm)/0.7)] hover:bg-[rgb(var(--voyana-rgb-background-input)/0.72)] focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-warm)/0.2)]"
          >
            <span className="block text-sm font-black text-(--voyana-color-text-primary)">
              {option.label}
            </span>
            <span className="mt-1 block text-sm leading-6 text-(--voyana-color-text-muted)">
              {option.note}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
