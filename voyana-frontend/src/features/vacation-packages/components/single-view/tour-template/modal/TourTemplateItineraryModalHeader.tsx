import { DialogTitle } from "@mui/material";

import type { VacationPackageItineraryDay } from "../../../../types/vacationPackage.types";

type TourTemplateItineraryModalHeaderProps = {
  day: VacationPackageItineraryDay;
  onClose: () => void;
};

export function TourTemplateItineraryModalHeader({
  day,
  onClose,
}: TourTemplateItineraryModalHeaderProps) {
  return (
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
  );
}
