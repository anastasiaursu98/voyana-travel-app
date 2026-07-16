import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { AppButton } from "../../../../../shared/ui";
import { useHeroSearchCard } from "../../../hooks/useHeroSearchCard";
import { HeroSearchPanel } from "./HeroSearchPanel";
import { heroSearchSegments } from "./heroSearchPanels.content";

export function HeroSearchCard() {
  const { activePanel, containerRef, handlePanelClose, handlePanelToggle } =
    useHeroSearchCard();

  return (
    <div className="pointer-events-none relative z-30 px-4 pb-6 sm:px-8 md:px-10 lg:absolute lg:inset-x-0 lg:bottom-24 lg:px-8 lg:pb-0 xl:bottom-28 2xl:bottom-44">
      <div
        ref={containerRef}
        className="pointer-events-auto relative mx-auto w-full max-w-212"
      >
        <form
          aria-label="Travel booking search"
          className="grid w-full grid-cols-1 gap-2 rounded-(--voyana-radius-search-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.76)] bg-(--voyana-color-white) p-2 text-(--voyana-color-text-primary) shadow-[0_16px_38px_rgb(var(--voyana-rgb-black)/0.16)] transition sm:grid-cols-2 md:rounded-(--voyana-radius-search-panel) lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.24fr)_auto] lg:gap-0 lg:rounded-(--voyana-radius-pill) lg:p-1.5"
        >
          {heroSearchSegments.map((segment, segmentIndex) => {
            const isActive = activePanel === segment.id;

            return (
              <AppButton
                intent="control"
                key={segment.id}
                type="button"
                aria-expanded={isActive}
                className={`flex min-h-16 min-w-0 flex-col justify-center rounded-(--voyana-radius-search-control) px-5 py-3 text-left transition focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-button-primary)/0.26)] lg:min-h-14 lg:rounded-(--voyana-radius-pill) lg:px-7 lg:py-0 ${
                  isActive
                    ? "bg-[rgb(var(--voyana-rgb-background-input)/0.78)] shadow-[0_10px_28px_rgb(var(--voyana-rgb-background-dark)/0.1)]"
                    : "hover:bg-[rgb(var(--voyana-rgb-background-input)/0.66)]"
                } ${
                  segmentIndex > 0 && !isActive
                    ? "lg:border-l lg:border-[rgb(var(--voyana-rgb-text-primary)/0.08)]"
                    : ""
                }`}
                onClick={() => handlePanelToggle(segment.id)}
              >
                <span className="text-xs font-black leading-none tracking-normal text-(--voyana-color-text-primary)">
                  {segment.label}
                </span>
                <span
                  className={`mt-1 truncate text-sm leading-none ${
                    isActive
                      ? "font-black text-(--voyana-color-text-primary)"
                      : "font-medium text-(--voyana-color-text-muted)"
                  }`}
                >
                  {segment.value}
                </span>
              </AppButton>
            );
          })}

          <AppButton
            startIcon={<SearchRoundedIcon fontSize="small" />}
            type="button"
            className="sm:col-span-2 lg:col-span-1 lg:my-auto"
            onClick={handlePanelClose}
          >
            Find my trip
          </AppButton>
        </form>

        {activePanel ? (
          <div className="relative z-40 mt-3 lg:absolute lg:inset-x-0 lg:top-[calc(100%+0.75rem)] lg:mt-0">
            <HeroSearchPanel activePanel={activePanel} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
