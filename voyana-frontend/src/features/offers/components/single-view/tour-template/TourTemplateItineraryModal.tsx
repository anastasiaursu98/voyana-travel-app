import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import type { TourTemplateItineraryDay } from "./content/tourTemplate.content";

type TourTemplateItineraryModalProps = {
  day: TourTemplateItineraryDay | null;
  onClose: () => void;
};

const getTransportLabel = (
  type: TourTemplateItineraryDay["transportation"]["type"],
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

export function TourTemplateItineraryModal({
  day,
  onClose,
}: TourTemplateItineraryModalProps) {
  return (
    <Dialog
      open={day !== null}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
          },
        },
      }}
    >
      {day ? (
        <>
          <DialogTitle
            sx={{
              alignItems: "flex-start",
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              pb: 1,
            }}
          >
            <div className="flex min-w-0 gap-3">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-(--voyana-color-accent-warm) text-center text-xs font-black leading-tight text-(--voyana-color-white)">
                <span>
                  {day.day}
                  <br />
                  day
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-normal text-(--voyana-color-text-muted)">
                  {day.location} / {day.stayLabel}
                </p>
                <h2 className="mt-1 text-2xl font-semibold leading-tight text-(--voyana-color-text-primary)">
                  {day.title}
                </h2>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close day details"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xl font-semibold text-(--voyana-color-text-muted) transition-colors hover:bg-(--voyana-color-background-section) hover:text-(--voyana-color-text-primary)"
              onClick={onClose}
            >
              x
            </button>
          </DialogTitle>

          <DialogContent sx={{ pb: 3 }}>
            <div className="grid gap-5">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={day.image.url}
                  alt={day.image.alt}
                  className="h-48 w-full object-cover sm:h-64"
                />
              </div>

              <p className="text-sm font-medium leading-7 text-(--voyana-color-text-body)">
                <span className="font-semibold text-(--voyana-color-text-primary)">
                  Destination overview:
                </span>{" "}
                {day.cityDescription}
              </p>

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
                      {day.accommodation.meta}
                    </p>
                    <p className="mt-3 text-sm font-medium leading-6 text-(--voyana-color-text-body)">
                      {day.accommodation.description}
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

              <section className="overflow-hidden rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.86)] bg-white">
                <div className="flex items-center justify-between gap-3 border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.76)] bg-(--voyana-color-background-section) px-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-(--voyana-color-accent-warm) text-(--voyana-color-white)">
                      <span className="text-xs font-black">
                        {getTransportLabel(day.transportation.type)}
                      </span>
                    </div>
                    <h3 className="truncate text-lg font-semibold text-(--voyana-color-text-primary)">
                      Transportation
                    </h3>
                  </div>
                  <p className="shrink-0 text-sm font-black text-(--voyana-color-text-primary)">
                    {day.transportation.luggage}
                  </p>
                </div>

                <div className="grid gap-4 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="text-base font-semibold text-(--voyana-color-text-primary)">
                        {day.transportation.carrier}
                      </h4>
                      <p className="mt-1 text-xs font-semibold text-(--voyana-color-text-muted)">
                        {day.transportation.route}
                      </p>
                    </div>
                    <p className="rounded-full bg-(--voyana-color-background-section) px-3 py-1 text-xs font-black text-(--voyana-color-text-primary)">
                      {day.transportation.duration}
                    </p>
                  </div>

                  <div className="grid items-center gap-3 sm:grid-cols-[minmax(0,1fr)_8rem_minmax(0,1fr)]">
                    <div className="min-w-0">
                      <p className="text-lg font-black text-(--voyana-color-text-primary)">
                        {day.transportation.departure}
                      </p>
                      <p className="mt-1 truncate text-xs font-semibold text-(--voyana-color-text-muted)">
                        Departure
                      </p>
                    </div>
                    <div className="hidden items-center gap-2 sm:flex">
                      <span className="h-px flex-1 bg-[rgb(var(--voyana-rgb-border-subtle)/0.96)]" />
                      <span className="text-xs font-black text-(--voyana-color-text-muted)">
                        {day.transportation.duration}
                      </span>
                      <span className="h-px flex-1 bg-[rgb(var(--voyana-rgb-border-subtle)/0.96)]" />
                    </div>
                    <div className="min-w-0 sm:text-right">
                      <p className="text-lg font-black text-(--voyana-color-text-primary)">
                        {day.transportation.arrival}
                      </p>
                      <p className="mt-1 truncate text-xs font-semibold text-(--voyana-color-text-muted)">
                        Arrival
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-medium leading-6 text-(--voyana-color-text-body)">
                    {day.transportation.description}
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-(--voyana-color-text-primary)">
                  Day plan
                </h3>
                <ol className="mt-3 grid gap-3">
                  {day.activities.map((activity, index) => (
                    <li
                      key={activity}
                      className="flex min-w-0 items-center gap-3 rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.72)] bg-white p-3"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-(--voyana-color-accent-warm) text-sm font-black text-(--voyana-color-white)">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-(--voyana-color-text-primary)">
                          {activity}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </DialogContent>
        </>
      ) : null}
    </Dialog>
  );
}
