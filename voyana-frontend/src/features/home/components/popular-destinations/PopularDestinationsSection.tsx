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
    <OnboardingSectionShell id="destinations">
      <SectionHeader
        title="Travel Destinations Available Worldwide"
        description="We have compiled a list of top destinations across the globe, scoured the world for the most alluring and fascinating places to visit. From the beautiful beaches of the Caribbean to the majestic mountains of Europe and the vibrant cities of Asia, our destination list has something for everyone."
        titleSize="display"
        titleTransform="none"
      />

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
          actionLabel="Explore list"
          eyebrow="More destinations"
          icon={<ExploreRoundedIcon fontSize="small" />}
          title="View all travel destinations"
        />
      </div>
    </OnboardingSectionShell>
  );
}
