import type { VacationPackageItineraryDay } from "../../../../types/vacationPackage.types";

type TourTemplateItineraryModalAccommodationProps = {
  day: VacationPackageItineraryDay;
};

export function TourTemplateItineraryModalAccommodation({
  day,
}: TourTemplateItineraryModalAccommodationProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.86)] bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.76)] bg-(--voyana-color-background-section) px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-(--voyana-color-accent-warm) text-(--voyana-color-white)">
            <span className="text-xs font-black">HT</span>
          </div>
          <h3 className="truncate text-lg font-semibold text-(--voyana-color-text-primary)">
            Accommodation
          </h3>
        </div>
        <p className="shrink-0 text-sm font-black text-(--voyana-color-text-primary)">
          {day.accommodation.nights}
        </p>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[12rem_minmax(0,1fr)]">
        {day.accommodation.imageUrl ? (
          <img
            src={day.accommodation.imageUrl}
            alt={day.accommodation.title}
            className="h-36 w-full rounded-lg object-cover sm:h-full"
          />
        ) : null}

        <div className="min-w-0">
          <h4 className="text-base font-semibold text-(--voyana-color-text-primary)">
            {day.accommodation.title}
          </h4>
          <p className="mt-1 text-xs font-semibold text-(--voyana-color-text-muted)">
            {day.accommodation.meta ?? day.location}
          </p>
          <p className="mt-3 text-sm font-medium leading-6 text-(--voyana-color-text-body)">
            {day.accommodation.description ??
              "Selected accommodation for this stage of the tour."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {day.accommodation.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full bg-[rgb(var(--voyana-rgb-accent-teal)/0.12)] px-3 py-1 text-xs font-bold text-(--voyana-color-accent-teal-strong)"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
