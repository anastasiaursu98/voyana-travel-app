import { useState } from "react";

import type { TourTemplateItineraryDay } from "./content/tourTemplate.content";

export function useTourTemplateItineraryModal() {
  const [selectedDay, setSelectedDay] =
    useState<TourTemplateItineraryDay | null>(null);

  return {
    closeDayDetails: () => setSelectedDay(null),
    openDayDetails: setSelectedDay,
    selectedDay,
  };
}
