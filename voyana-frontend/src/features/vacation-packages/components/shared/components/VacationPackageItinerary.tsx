import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import type { VacationPackageItineraryDay } from "../../../types/vacationPackageDetails.types";
import { VacationPackageSectionPanel } from "./VacationPackageSectionPanel";

type VacationPackageItineraryProps = {
  days: readonly VacationPackageItineraryDay[];
  description?: string;
  title?: string;
};

export function VacationPackageItinerary({
  days,
  description,
  title = "Itinerary",
}: VacationPackageItineraryProps) {
  if (days.length === 0) {
    return null;
  }

  return (
    <VacationPackageSectionPanel description={description} title={title}>
      <div className="grid gap-4">
        {days.map((day) => (
          <article
            key={day.day}
            className="grid gap-3 rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.7)] p-4 sm:grid-cols-[7rem_minmax(0,1fr)]"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-(--voyana-color-text-primary)">
              <CalendarMonthRoundedIcon
                fontSize="small"
                className="text-[rgb(var(--voyana-rgb-text-muted)/0.72)]"
              />
              Day {day.day}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-(--voyana-color-text-primary)">
                {day.title}
              </h3>
              <ul className="mt-2 grid gap-1.5 text-sm font-medium leading-6 text-(--voyana-color-text-body)">
                {day.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </VacationPackageSectionPanel>
  );
}
