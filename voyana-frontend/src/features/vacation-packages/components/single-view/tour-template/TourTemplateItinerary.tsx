import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { VacationPackageSectionPanel } from "../../shared/components";
import type { VacationPackageItineraryDay } from "../../../types/vacationPackage.types";
import { TourTemplateItineraryModal } from "./modal";
import { useTourTemplateItineraryModal } from "./useTourTemplateItineraryModal";

type TourTemplateItineraryProps = {
  itineraryDays?: VacationPackageItineraryDay[];
};

export function TourTemplateItinerary({
  itineraryDays,
}: TourTemplateItineraryProps) {
  const { closeDayDetails, openDayDetails, selectedDay } =
    useTourTemplateItineraryModal();
  const resolvedItinerary = itineraryDays ?? [];

  return (
    <>
      <VacationPackageSectionPanel
        description="Select a day to view the visited city, accommodation, transportation, and detailed plan."
        title="Day-by-day itinerary"
      >
        <div className="grid gap-3">
          {resolvedItinerary.map((day) => (
            <button
              key={day.day}
              type="button"
              className="group grid w-full min-w-0 grid-cols-[4.25rem_minmax(0,1fr)] items-center gap-3 rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.86)] bg-white p-3 text-left transition duration-200 hover:border-[rgb(var(--voyana-rgb-accent-teal)/0.42)] hover:bg-(--voyana-color-background-section) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.16)] sm:grid-cols-[5rem_5.75rem_minmax(0,1fr)_auto]"
              onClick={() => openDayDetails(day)}
            >
              <div className="grid h-14 w-14 place-items-center rounded-lg bg-(--voyana-color-background-section) text-sm font-black text-(--voyana-color-text-primary) group-hover:bg-white sm:h-16 sm:w-16">
                Day {day.day}
              </div>

              <img
                src={day.image.url}
                alt={day.image.alt}
                className="hidden h-16 w-full rounded-lg object-cover sm:block"
              />

              <div className="min-w-0">
                <p className="inline-flex max-w-full items-center gap-1.5 text-xs font-bold uppercase tracking-normal text-(--voyana-color-text-muted)">
                  <LocationOnOutlinedIcon className="text-[1rem]" />
                  <span className="truncate">{day.location}</span>
                </p>
                <h3 className="mt-1 truncate text-sm font-semibold text-(--voyana-color-text-primary) sm:text-base">
                  {day.title}
                </h3>
                <p className="mt-1 inline-flex max-w-full items-center gap-1 text-xs font-semibold text-(--voyana-color-text-muted)">
                  <span className="truncate">
                    {day.stayLabel ?? "Planned stay"}
                    {day.departure ? ` / ${day.departure}` : ""}
                  </span>
                </p>
              </div>

              <div className="hidden items-center gap-1 text-sm font-semibold text-(--voyana-color-text-primary) sm:flex">
                Details
                <ArrowForwardRoundedIcon className="text-[1rem] transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          ))}
        </div>
      </VacationPackageSectionPanel>

      <TourTemplateItineraryModal day={selectedDay} onClose={closeDayDetails} />
    </>
  );
}
