import type { VacationPackageItineraryDay } from "../../../../types/vacationPackage.types";

type TourTemplateItineraryModalOverviewProps = {
  day: VacationPackageItineraryDay;
};

export function TourTemplateItineraryModalOverview({
  day,
}: TourTemplateItineraryModalOverviewProps) {
  return (
    <>
      <div className="overflow-hidden rounded-(--voyana-radius-card)">
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
        {day.cityDescription ?? "Detailed day plan for this itinerary stop."}
      </p>
    </>
  );
}
