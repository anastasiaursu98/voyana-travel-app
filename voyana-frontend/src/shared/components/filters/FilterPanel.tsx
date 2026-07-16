import { AppTypography } from "../../ui";
import { AppButton } from "../../ui";
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
  description,
  onReset,
  title = "Filters",
}: FilterPanelProps) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start" aria-label={ariaLabel}>
      <form className="overflow-hidden rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.92)] bg-(--voyana-color-background-card) shadow-(--voyana-shadow-panel)">
        <div className="border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.72)] px-4 py-4 sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.8)] bg-(--voyana-color-background-section) text-(--voyana-color-text-primary)">
                <TuneRoundedIcon className="text-[1.1rem]" />
              </span>
              <div className="min-w-0">
                <AppTypography variant="label" className=" uppercase leading-tight tracking-normal text-(--voyana-color-text-primary)">
                  {title}
                </AppTypography>
                {description ? (
                  <p className="mt-1 text-xs font-medium leading-5 text-(--voyana-color-text-muted)">
                    {description}
                  </p>
                ) : null}
              </div>
            </div>
            {onReset ? (
              <AppButton intent="control"
                aria-label="Reset filters"
                className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-(--voyana-radius-pill) bg-transparent px-2.5 text-xs font-black text-(--voyana-color-text-muted) transition hover:bg-(--voyana-color-background-section) hover:text-(--voyana-color-text-primary) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.14)]"
                onClick={onReset}
                startIcon={<RestartAltRoundedIcon className="text-[1rem]" />}
                title="Reset filters"
                type="button"
              >
                Reset
              </AppButton>
            ) : null}
          </div>
        </div>

        <div className="grid gap-0 px-4 py-2 sm:px-5">{children}</div>
      </form>
    </aside>
  );
}
