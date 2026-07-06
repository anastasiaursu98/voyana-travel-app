import { budgetOptions } from "./heroSearchPanels.content";

export function HeroBudgetPanel() {
  return (
    <div className="p-4 sm:p-5">
      <p className="text-xs font-black text-(--voyana-color-text-strong)">
        Budget inspiration
      </p>

      <div className="mt-3 space-y-2">
        {budgetOptions.map((option) => (
          <button
            key={option.label}
            type="button"
            className="block w-full rounded-2xl border border-[rgb(var(--voyana-rgb-border-subtle)/0.78)] p-4 text-left transition hover:border-[rgb(var(--voyana-rgb-accent-teal)/0.5)] hover:bg-[rgb(var(--voyana-rgb-background-input)/0.72)] focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.2)]"
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
