import { useState } from "react";

import type { VacationPackageItineraryDay } from "../../../types/vacationPackage.types";

export function useTourTemplateItineraryModal() {
  const [selectedDay, setSelectedDay] =
    useState<VacationPackageItineraryDay | null>(null);

  return {
    closeDayDetails: () => setSelectedDay(null),
    openDayDetails: setSelectedDay,
    selectedDay,
  };
}
