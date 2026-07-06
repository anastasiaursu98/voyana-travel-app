import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import { useEffect } from "react";
import { routes } from "../../../../app/router/routes";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import { SectionHeader } from "../../../../shared/components/SectionHeader";
import { ViewMoreCard } from "../../../../shared/components/ViewMoreCard";
import { DestinationCard } from "../../../destinations/components/shared";
import {
  fetchDestinations,
  selectDestinations,
  selectDestinationsError,
  selectDestinationsStatus,
} from "../../../destinations/store/destinationsSlice";
import { OnboardingSectionShell } from "../shared/OnboardingSectionShell";

export function PopularDestinationsSection() {
  const dispatch = useAppDispatch();
  const destinations = useAppSelector(selectDestinations);
  const status = useAppSelector(selectDestinationsStatus);
  const error = useAppSelector(selectDestinationsError);

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchDestinations());
    }
  }, [dispatch, status]);
  return (
    <OnboardingSectionShell
      id="destinations"
      tone="white"
      className="bg-[linear-gradient(180deg,rgb(var(--voyana-rgb-white))_0%,rgb(var(--voyana-rgb-background-section))_100%)]"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Popular destinations"
          title="Popular destinations right now"
          description="Explore places travelers are choosing for beach holidays, city breaks, and seasonal escapes."
          className="lg:max-w-none lg:[&_h2]:whitespace-nowrap"
          titleSize="large"
          titleTransform="none"
        />
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {status === "failed" ? (
          <p className="mt-8 text-sm font-bold text-(--voyana-color-text-muted)">
            {error ?? "Destinations could not be loaded."}
          </p>
        ) : (
          destinations.slice(0, 3).map((destination) => (
            <DestinationCard
              key={destination._id}
              imageAlt={destination.coverImage.alt}
              imageUrl={destination.coverImage.url}
              location={destination.countryCode}
              priceLabel={
                destination.startingPrice
                  ? `Starting from ${new Intl.NumberFormat("en-US", {
                      currency: "EUR",
                      maximumFractionDigits: 0,
                      style: "currency",
                    }).format(destination.startingPrice)}`
                  : undefined
              }
              title={destination.name}
            />
          ))
        )}
        <ViewMoreCard
          to={routes.destinations}
          aria-label="View all destinations"
          actionLabel="Browse destinations"
          eyebrow="More places"
          icon={<ExploreRoundedIcon fontSize="small" />}
          title="Browse destinations"
        />
      </div>
    </OnboardingSectionShell>
  );
}
