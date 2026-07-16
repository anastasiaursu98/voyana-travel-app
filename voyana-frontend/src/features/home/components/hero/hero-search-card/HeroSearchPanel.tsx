import { AppTypography } from "../../../../../shared/ui";
import { AppButton } from "../../../../../shared/ui";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChurchRoundedIcon from "@mui/icons-material/ChurchRounded";
import ForestRoundedIcon from "@mui/icons-material/ForestRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import TempleBuddhistRoundedIcon from "@mui/icons-material/TempleBuddhistRounded";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { ComponentType, CSSProperties } from "react";
import {
  calendarMonths,
  calendarTabs,
  destinationSuggestions,
  flexibleDateOptions,
  weekdayLabels,
} from "./heroSearchPanels.content";
import { HeroBudgetPanel } from "./HeroBudgetPanel";
import { HeroTripStylePanel } from "./HeroTripStylePanel";
import type { HeroSearchPanel as HeroSearchPanelName } from "./types";

type HeroSearchPanelProps = {
  activePanel: HeroSearchPanelName;
};

type DestinationIcon = (typeof destinationSuggestions)[number]["icon"];

const destinationIcons = {
  apartment: ApartmentRoundedIcon,
  church: ChurchRoundedIcon,
  city: LocationCityRoundedIcon,
  forest: ForestRoundedIcon,
  mountain: PlaceRoundedIcon,
  nearby: NearMeRoundedIcon,
  temple: TempleBuddhistRoundedIcon,
} satisfies Record<DestinationIcon, ComponentType<SvgIconProps>>;

const panelWidthClasses = {
  budget: "lg:mx-auto lg:max-w-112",
  style: "lg:ml-auto lg:max-w-128",
  where: "lg:mr-auto lg:max-w-112",
  when: "lg:mx-auto lg:max-w-212",
} as const;

export function HeroSearchPanel({ activePanel }: HeroSearchPanelProps) {
  return (
    <div
      className={`voyana-scrollbar max-h-[min(34rem,calc(100vh-9rem))] w-full overflow-y-auto overflow-x-hidden rounded-(--voyana-radius-search-panel) bg-(--voyana-color-white) text-(--voyana-color-text-primary) shadow-[0_22px_60px_rgb(var(--voyana-rgb-background-dark)/0.2)] ring-1 ring-[rgb(var(--voyana-rgb-border-subtle)/0.72)] ${panelWidthClasses[activePanel]}`}
    >
      {activePanel === "where" ? <WherePanel /> : null}
      {activePanel === "when" ? <CalendarPanel /> : null}
      {activePanel === "budget" ? <HeroBudgetPanel /> : null}
      {activePanel === "style" ? <HeroTripStylePanel /> : null}
    </div>
  );
}

function WherePanel() {
  return (
    <div className="p-4 sm:p-5">
      <p className="text-xs font-black text-(--voyana-color-text-strong)">
        Suggested destinations
      </p>

      <div className="mt-3 space-y-1.5">
        {destinationSuggestions.map((destination) => {
          const Icon = destinationIcons[destination.icon];
          const iconStyle = {
            backgroundColor: destination.accent,
            color: destination.iconColor,
          } satisfies CSSProperties;

          return (
            <AppButton intent="control"
              key={destination.title}
              type="button"
              startIcon={
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-(--voyana-radius-panel)"
                  style={iconStyle}
                >
                  <Icon fontSize="small" />
                </span>
              }
              className="flex w-full items-center gap-3 rounded-(--voyana-radius-modal) p-1 text-left transition hover:bg-[rgb(var(--voyana-rgb-background-input)/0.78)] focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-button-primary)/0.22)]"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-black text-(--voyana-color-text-primary)">
                  {destination.title}
                </span>
                <span className="mt-0.5 block truncate text-sm font-medium text-(--voyana-color-text-muted)">
                  {destination.subtitle}
                </span>
              </span>
            </AppButton>
          );
        })}
      </div>
    </div>
  );
}

function CalendarPanel() {
  return (
    <div className="p-5 sm:p-7">
      <div className="mx-auto grid max-w-76 grid-cols-2 rounded-(--voyana-radius-pill) bg-[rgb(var(--voyana-rgb-border-subtle)/0.5)] p-1">
        {calendarTabs.map((tab, tabIndex) => (
          <AppButton intent="control"
            key={tab}
            type="button"
            className={`h-9 rounded-(--voyana-radius-pill) text-sm font-black transition ${
              tabIndex === 0
                ? "bg-(--voyana-color-white) text-(--voyana-color-text-primary) shadow-[0_5px_18px_rgb(var(--voyana-rgb-background-dark)/0.12)]"
                : "text-[rgb(var(--voyana-rgb-text-primary)/0.72)] hover:bg-[rgb(var(--voyana-rgb-white)/0.48)]"
            }`}
          >
            {tab}
          </AppButton>
        ))}
      </div>

      <div className="mt-7 grid gap-8 md:grid-cols-2">
        {calendarMonths.map((month, monthIndex) => (
          <div key={month.title}>
            <div className="mb-5 flex items-center justify-between">
              <AppButton intent="control"
                type="button"
                aria-label="Previous month"
                icon={<ChevronLeftRoundedIcon fontSize="small" />}
                className={`grid size-9 place-items-center rounded-(--voyana-radius-pill) text-(--voyana-color-text-primary) transition hover:bg-[rgb(var(--voyana-rgb-background-input)/0.85)] ${
                  monthIndex === 0 ? "" : "invisible"
                }`}
              />

              <AppTypography variant="cardTitle" className=" text-(--voyana-color-text-primary)">
                {month.title}
              </AppTypography>

              <AppButton intent="control"
                type="button"
                aria-label="Next month"
                icon={<ChevronRightRoundedIcon fontSize="small" />}
                className={`grid size-9 place-items-center rounded-(--voyana-radius-pill) text-(--voyana-color-text-primary) transition hover:bg-[rgb(var(--voyana-rgb-background-input)/0.85)] ${
                  monthIndex === calendarMonths.length - 1 ? "" : "invisible"
                }`}
              />
            </div>

            <div className="grid grid-cols-7 gap-y-3 text-center text-xs font-bold text-[rgb(var(--voyana-rgb-text-primary)/0.58)]">
              {weekdayLabels.map((day, dayIndex) => (
                <span key={`${month.title}-${day}-${dayIndex}`}>{day}</span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-7 gap-y-3 text-center">
              {month.days.map((day, dayIndex) =>
                day ? (
                  <AppButton intent="control"
                    key={`${month.title}-${day.label}-${dayIndex}`}
                    type="button"
                    className={`mx-auto grid size-9 place-items-center rounded-(--voyana-radius-pill) text-sm font-black transition hover:bg-(--voyana-color-button-primary) hover:text-(--voyana-color-button-primary-text) ${
                      day.muted
                        ? "text-[rgb(var(--voyana-rgb-text-primary)/0.26)]"
                        : "text-(--voyana-color-text-primary)"
                    }`}
                  >
                    {day.label}
                  </AppButton>
                ) : (
                  <span
                    key={`${month.title}-empty-${dayIndex}`}
                    aria-hidden="true"
                    className="size-9"
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {flexibleDateOptions.map((option, optionIndex) => (
          <AppButton intent="control"
            key={option}
            type="button"
            className={`rounded-(--voyana-radius-pill) border px-4 py-2 text-xs font-black transition ${
              optionIndex === 0
                ? "border-(--voyana-color-text-primary) text-(--voyana-color-text-primary)"
                : "border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] text-[rgb(var(--voyana-rgb-text-primary)/0.76)] hover:border-(--voyana-color-button-primary)"
            }`}
          >
            {option}
          </AppButton>
        ))}
      </div>
    </div>
  );
}
