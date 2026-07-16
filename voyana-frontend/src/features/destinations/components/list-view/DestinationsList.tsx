import { useEffect } from "react";
import { routes } from "../../../../app/router/routes";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import { PublicPageShell } from "../../../../shared/components/PublicPageShell";
import { SectionHeader } from "../../../../shared/components/SectionHeader";
import {
  fetchDestinations,
  selectDestinations,
  selectDestinationsError,
  selectDestinationsStatus,
} from "../../store/destinationsSlice";
import { DestinationCard } from "../shared";

export const DestinationsList = () => {
  const dispatch = useAppDispatch();
  const destinations = useAppSelector(selectDestinations);
  const status = useAppSelector(selectDestinationsStatus);
  const error = useAppSelector(selectDestinationsError);

  const getDestinationVacationPackagesPath = (destinationSlug: string) => {
    const params = new URLSearchParams({
      destination: destinationSlug,
    });

    return `${routes.vacationPackages}?${params.toString()}`;
  };

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchDestinations());
    }
  }, [dispatch, status]);

  const formatDestinationPrice = (startingPrice?: number) =>
    startingPrice !== undefined
      ? `From ${new Intl.NumberFormat("en-US", {
          currency: "EUR",
          maximumFractionDigits: 0,
          style: "currency",
        }).format(startingPrice)}`
      : undefined;

  const activeDestinationsCount = destinations.length;

  if (status === "loading") {
    return (
      <PublicPageShell>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            title="Destinations"
            description="Explore curated places with handpicked stays, experiences, and travel deals."
            className="max-w-3xl"
          />
          <span className="w-fit rounded-(--voyana-radius-pill) bg-(--voyana-color-background-section) px-4 py-2 text-sm font-black text-(--voyana-color-text-muted)">
            Loading destinations
          </span>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              className="min-h-96 animate-pulse rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] bg-(--voyana-color-background-section)"
              key={item}
            />
          ))}
        </div>
      </PublicPageShell>
    );
  }

  return (
    <PublicPageShell>
      <div
        className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        id="destinations"
      >
        <SectionHeader
          title="Destinations"
          description="Explore curated places with handpicked stays, experiences, and travel deals."
          className="max-w-3xl"
        />
        <div className="flex flex-wrap gap-2">
          <span className="rounded-(--voyana-radius-pill) bg-(--voyana-color-background-section) px-4 py-2 text-sm font-black text-(--voyana-color-text-primary)">
            {activeDestinationsCount} destinations
          </span>
          <span className="rounded-(--voyana-radius-pill) bg-[rgb(var(--voyana-rgb-accent-teal)/0.11)] px-4 py-2 text-sm font-black text-(--voyana-color-accent-teal-strong)">
            Curated stays
          </span>
        </div>
      </div>

      {status === "failed" ? (
        <p className="mt-8 rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.92)] bg-(--voyana-color-background-section) p-5 text-sm font-bold text-(--voyana-color-text-muted)">
          {error ?? "Destinations could not be loaded."}
        </p>
      ) : destinations.length === 0 ? (
        <p className="mt-8 rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.92)] bg-(--voyana-color-background-section) p-5 text-sm font-bold text-(--voyana-color-text-muted)">
          No destinations available.
        </p>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination._id}
              link={getDestinationVacationPackagesPath(destination.slug)}
              description={destination.description}
              imageAlt={destination.coverImage.alt}
              imageUrl={destination.coverImage.url}
              location={destination.countryCode}
              priceLabel={formatDestinationPrice(destination.startingPrice)}
              title={destination.name}
            />
          ))}
        </div>
      )}
    </PublicPageShell>
  );
};
