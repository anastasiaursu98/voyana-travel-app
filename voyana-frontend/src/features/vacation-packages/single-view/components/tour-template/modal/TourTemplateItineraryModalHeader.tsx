import { AppTypography } from "../../../../../../shared/ui";
import { AppButton } from "../../../../../../shared/ui";
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
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-(--voyana-radius-card) bg-(--voyana-color-accent-warm) text-center text-xs font-black leading-tight text-(--voyana-color-button-primary-text)">
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
          <AppTypography variant="cardTitle" className="mt-1 leading-tight text-(--voyana-color-text-primary)">
            {day.title}
          </AppTypography>
        </div>
      </div>
      <AppButton intent="control"
        type="button"
        aria-label="Close day details"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-(--voyana-radius-pill) text-xl font-semibold text-(--voyana-color-text-muted) transition-colors hover:bg-(--voyana-color-background-section) hover:text-(--voyana-color-text-primary)"
        onClick={onClose}
      >
        x
      </AppButton>
    </DialogTitle>
  );
}
