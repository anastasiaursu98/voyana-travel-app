import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import type { OfferActivity } from "../../../types/offerDetails.types";
import { OfferSectionPanel } from "./OfferSectionPanel";

type OfferActivitiesProps = {
  activities: readonly OfferActivity[];
  description?: string;
  title?: string;
};

export function OfferActivities({
  activities,
  description,
  title = "Activities",
}: OfferActivitiesProps) {
  if (activities.length === 0) {
    return null;
  }

  return (
    <OfferSectionPanel description={description} title={title}>
      <div className="grid gap-4 sm:grid-cols-2">
        {activities.map((activity) => (
          <article
            key={activity.id}
            className="min-w-0 rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.7)] p-4"
          >
            <div className="flex min-w-0 items-start gap-3">
              <ExploreOutlinedIcon
                fontSize="small"
                className="mt-0.5 shrink-0 text-[rgb(var(--voyana-rgb-text-muted)/0.72)]"
              />
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-(--voyana-color-text-primary)">
                  {activity.title}
                </h3>
                {activity.duration ? (
                  <p className="mt-1 text-xs font-bold text-(--voyana-color-text-muted)">
                    {activity.duration}
                  </p>
                ) : null}
                {activity.description ? (
                  <p className="mt-2 text-sm font-medium leading-6 text-(--voyana-color-text-body)">
                    {activity.description}
                  </p>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </OfferSectionPanel>
  );
}
