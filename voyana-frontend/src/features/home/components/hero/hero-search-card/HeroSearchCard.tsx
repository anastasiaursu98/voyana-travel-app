import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useHeroSearchCard } from "../../../hooks/useHeroSearchCard";
import { HeroSearchPanel } from "./HeroSearchPanel";
import { heroSearchSegments } from "./heroSearchPanels.content";

export function HeroSearchCard() {
  const {
    activePanel,
    containerRef,
    handlePanelClose,
    handlePanelToggle,
  } = useHeroSearchCard();

  return (
    <div className="pointer-events-none relative z-30 px-4 pb-6 sm:px-8 md:px-10 lg:absolute lg:inset-x-0 lg:bottom-24 lg:px-8 lg:pb-0 xl:bottom-28 2xl:bottom-44">
      <div
        ref={containerRef}
        className="pointer-events-auto relative mx-auto w-full max-w-212"
      >
        <form
          aria-label="Travel booking search"
          className="grid w-full grid-cols-1 gap-2 rounded-[30px] border border-[rgb(var(--voyana-rgb-border-subtle)/0.76)] bg-(--voyana-color-white) p-2 text-(--voyana-color-text-primary) shadow-[0_16px_38px_rgb(var(--voyana-rgb-black)/0.16)] transition sm:grid-cols-2 md:rounded-[32px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.24fr)_auto] lg:gap-0 lg:rounded-full lg:p-1.5"
        >
          {heroSearchSegments.map((segment, segmentIndex) => {
            const isActive = activePanel === segment.id;

            return (
              <button
                key={segment.id}
                type="button"
                aria-expanded={isActive}
                className={`flex min-h-16 min-w-0 flex-col justify-center rounded-[24px] px-5 py-3 text-left transition focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-button-primary)/0.26)] lg:min-h-14 lg:rounded-full lg:px-7 lg:py-0 ${
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
              </button>
            );
          })}

          <button
            type="button"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-(--voyana-color-button-primary) px-7 text-sm font-black text-(--voyana-color-button-primary-text) shadow-[0_10px_24px_rgb(var(--voyana-rgb-button-primary)/0.32)] transition hover:bg-(--voyana-color-button-primary-hover) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-button-primary)/0.34)] active:bg-(--voyana-color-button-primary-active) sm:col-span-2 lg:col-span-1 lg:my-auto"
            onClick={handlePanelClose}
          >
            <SearchRoundedIcon fontSize="small" />
            <span>Find my trip</span>
          </button>
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
