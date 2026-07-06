import type { ReactNode } from "react";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

type FilterPanelProps = {
  "aria-label": string;
  children: ReactNode;
  description?: string;
  onReset?: () => void;
  title?: string;
};

export function FilterPanel({
  "aria-label": ariaLabel,
  children,
  description = "Narrow your preferences",
  onReset,
  title = "Filters",
}: FilterPanelProps) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start" aria-label={ariaLabel}>
      <form className="rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.92)] bg-white p-4 shadow-[0_18px_44px_rgb(var(--voyana-rgb-black)/0.07)] sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-(--voyana-color-background-dark) text-(--voyana-color-white)">
              <TuneRoundedIcon className="text-[1.25rem]" />
            </span>
            <div className="min-w-0">
              <h2 className="text-base font-black uppercase leading-tight tracking-normal text-(--voyana-color-text-primary)">
                {title}
              </h2>
              {description ? (
                <p className="mt-1 text-xs font-bold leading-5 text-(--voyana-color-text-muted)">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
          {onReset ? (
            <button
              aria-label="Reset filters"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] text-(--voyana-color-text-muted) transition-colors hover:border-[rgb(var(--voyana-rgb-text-primary)/0.22)] hover:text-(--voyana-color-text-primary)"
              onClick={onReset}
              title="Reset filters"
              type="button"
            >
              <RestartAltRoundedIcon className="text-[1.15rem]" />
            </button>
          ) : null}
        </div>

        <div className="mt-5 grid gap-5">{children}</div>
      </form>
    </aside>
  );
}
