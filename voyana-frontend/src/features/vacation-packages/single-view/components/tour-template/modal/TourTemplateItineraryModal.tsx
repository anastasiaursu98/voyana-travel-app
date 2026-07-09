import { Dialog, DialogContent } from "@mui/material";

import type { VacationPackageItineraryDay } from "../../../../types/vacationPackage.types";
import { TourTemplateItineraryModalAccommodation } from "./TourTemplateItineraryModalAccommodation";
import { TourTemplateItineraryModalActivities } from "./TourTemplateItineraryModalActivities";
import { TourTemplateItineraryModalHeader } from "./TourTemplateItineraryModalHeader";
import { TourTemplateItineraryModalOverview } from "./TourTemplateItineraryModalOverview";
import { TourTemplateItineraryModalTransportation } from "./TourTemplateItineraryModalTransportation";

type TourTemplateItineraryModalProps = {
  day: VacationPackageItineraryDay | null;
  onClose: () => void;
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
          <TourTemplateItineraryModalHeader day={day} onClose={onClose} />

          <DialogContent sx={{ pb: 3 }}>
            <div className="grid gap-5">
              <TourTemplateItineraryModalOverview day={day} />
              <TourTemplateItineraryModalAccommodation day={day} />
              <TourTemplateItineraryModalTransportation day={day} />
              <TourTemplateItineraryModalActivities activities={day.activities} />
            </div>
          </DialogContent>
        </>
      ) : null}
    </Dialog>
  );
}
