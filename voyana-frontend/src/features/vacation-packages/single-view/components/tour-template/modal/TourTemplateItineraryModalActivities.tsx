import { AppTypography } from "../../../../../../shared/ui";
import type { VacationPackageItineraryDay } from "../../../../types/vacationPackage.types";

type TourTemplateItineraryModalActivitiesProps = {
  activities: VacationPackageItineraryDay["activities"];
};

export function TourTemplateItineraryModalActivities({
  activities,
}: TourTemplateItineraryModalActivitiesProps) {
  return (
    <section>
      <AppTypography variant="cardTitle" className=" text-(--voyana-color-text-primary)">
        Day plan
      </AppTypography>
      <ol className="mt-3 grid gap-3">
        {activities.map((activity, index) => (
          <li
            key={activity}
            className="flex min-w-0 items-center gap-3 rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.72)] bg-(--voyana-color-background-card) p-3"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-(--voyana-radius-card) bg-(--voyana-color-accent-warm) text-sm font-black text-(--voyana-color-button-primary-text)">
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
  );
}
