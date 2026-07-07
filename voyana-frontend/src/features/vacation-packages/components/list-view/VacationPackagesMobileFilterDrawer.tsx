import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import type { RefObject, ReactNode } from "react";

type VacationPackagesMobileFilterDrawerProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  panelRef: RefObject<HTMLDivElement | null>;
};

export function VacationPackagesMobileFilterDrawer({
  children,
  isOpen,
  onClose,
  panelRef,
}: VacationPackagesMobileFilterDrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-[119] bg-[rgb(var(--voyana-rgb-background-dark)/0.42)] opacity-100 transition-opacity"
        aria-label="Close filters"
      />
      <aside
        ref={panelRef}
        aria-labelledby="mobile-vacation-package-filters-title"
        aria-modal="true"
        className="fixed inset-x-3 bottom-3 z-[120] max-h-[calc(100dvh-2rem)] translate-y-0 overflow-hidden rounded-lg bg-white opacity-100 shadow-[0_26px_80px_rgb(var(--voyana-rgb-background-dark)/0.28)] transition duration-300"
        role="dialog"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.86)] px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-(--voyana-color-background-dark) text-(--voyana-color-white)">
              <TuneRoundedIcon className="text-[1.2rem]" />
            </span>
            <div className="min-w-0">
              <h2
                id="mobile-vacation-package-filters-title"
                className="text-base font-black uppercase leading-tight text-(--voyana-color-text-primary)"
              >
                Filters
              </h2>
              <p className="text-xs font-bold text-(--voyana-color-text-muted)">
                Narrow your vacation package search
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] text-(--voyana-color-text-primary) transition hover:bg-(--voyana-color-background-section) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.18)]"
            aria-label="Close filters"
          >
            <CloseRoundedIcon fontSize="small" />
          </button>
        </div>
        <div className="voyana-scrollbar max-h-[calc(100dvh-8rem)] overflow-y-auto p-4">
          {children}
        </div>
      </aside>
    </div>
  );
}
