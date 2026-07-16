import { AppTypography } from "../../../../../../shared/ui";
import type { VacationPackageItineraryDay } from "../../../../types/vacationPackage.types";

type TourTemplateItineraryModalTransportationProps = {
  day: VacationPackageItineraryDay;
};

const getTransportLabel = (
  type: VacationPackageItineraryDay["transportation"]["type"],
) => {
  if (type === "flight") {
    return "FL";
  }

  if (type === "rail") {
    return "JR";
  }

  if (type === "transfer") {
    return "TR";
  }

  return "WK";
};

export function TourTemplateItineraryModalTransportation({
  day,
}: TourTemplateItineraryModalTransportationProps) {
  return (
    <section className="overflow-hidden rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.86)] bg-(--voyana-color-background-card)">
      <div className="flex items-center justify-between gap-3 border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.76)] bg-(--voyana-color-background-section) px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-(--voyana-radius-card) bg-(--voyana-color-accent-warm) text-(--voyana-color-button-primary-text)">
            <span className="text-xs font-black">
              {getTransportLabel(day.transportation.type)}
            </span>
          </div>
          <AppTypography variant="cardTitle" className="truncate text-(--voyana-color-text-primary)">
            Transportation
          </AppTypography>
        </div>
        <p className="shrink-0 text-sm font-black text-(--voyana-color-text-primary)">
          {day.transportation.luggage ?? "Standard luggage"}
        </p>
      </div>

      <div className="grid gap-4 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="text-base font-semibold text-(--voyana-color-text-primary)">
              {day.transportation.carrier ?? "Planned transport"}
            </h4>
            <p className="mt-1 text-xs font-semibold text-(--voyana-color-text-muted)">
              {day.transportation.route ?? day.location}
            </p>
          </div>
          <p className="rounded-(--voyana-radius-pill) bg-(--voyana-color-background-section) px-3 py-1 text-xs font-black text-(--voyana-color-text-primary)">
            {day.transportation.duration ?? "Planned timing"}
          </p>
        </div>

        <div className="grid items-center gap-3 sm:grid-cols-[minmax(0,1fr)_8rem_minmax(0,1fr)]">
          <div className="min-w-0">
            <p className="text-lg font-black text-(--voyana-color-text-primary)">
              {day.transportation.departure ?? "TBC"}
            </p>
            <p className="mt-1 truncate text-xs font-semibold text-(--voyana-color-text-muted)">
              Departure
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-px flex-1 bg-[rgb(var(--voyana-rgb-border-subtle)/0.96)]" />
            <span className="text-xs font-black text-(--voyana-color-text-muted)">
              {day.transportation.duration ?? "Planned timing"}
            </span>
            <span className="h-px flex-1 bg-[rgb(var(--voyana-rgb-border-subtle)/0.96)]" />
          </div>
          <div className="min-w-0 sm:text-right">
            <p className="text-lg font-black text-(--voyana-color-text-primary)">
              {day.transportation.arrival ?? "TBC"}
            </p>
            <p className="mt-1 truncate text-xs font-semibold text-(--voyana-color-text-muted)">
              Arrival
            </p>
          </div>
        </div>

        <p className="text-sm font-medium leading-6 text-(--voyana-color-text-body)">
          {day.transportation.description ??
            "Transport details are confirmed with the final itinerary."}
        </p>
      </div>
    </section>
  );
}
