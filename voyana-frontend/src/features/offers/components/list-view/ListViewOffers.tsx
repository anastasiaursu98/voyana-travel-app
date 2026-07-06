import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import { PublicPageShell } from "../../../../shared/components/PublicPageShell";
import { SectionHeader } from "../../../../shared/components/SectionHeader";
import {
  OFFER_PRICE_FILTER_MAX,
  OFFER_PRICE_FILTER_MIN,
  useOffersFilters,
} from "../../hooks/useOffersFilters";
import {
  fetchOffers,
  selectOffers,
  selectOffersError,
  selectOffersStatus,
} from "../../store/offersSlice";
import { OfferCard } from "./OfferCard";
import { OffersFilterPanel } from "./OffersFilterPanel";

export const ListViewOffers = () => {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(selectOffers);
  const offersStatus = useAppSelector(selectOffersStatus);
  const offersError = useAppSelector(selectOffersError);

  const { filters, handleCategoryChange, handlePriceRangeChange } =
    useOffersFilters();

  useEffect(() => {
    void dispatch(fetchOffers(filters));
  }, [dispatch, filters]);

  return (
    <PublicPageShell>
      <div className="grid gap-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            title="Offers"
            description="Compare curated travel deals with clear prices, trip details, and handpicked stays."
            className="max-w-3xl"
          />
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-(--voyana-color-background-section) px-4 py-2 text-sm font-black text-(--voyana-color-text-primary)">
              {offers.length} offers
            </span>
            <span className="rounded-full bg-[rgb(var(--voyana-rgb-accent-teal)/0.11)] px-4 py-2 text-sm font-black text-(--voyana-color-accent-teal-strong)">
              Curated deals
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start">
          <OffersFilterPanel
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={handlePriceRangeChange}
            priceRange={[
              filters.minPrice ?? OFFER_PRICE_FILTER_MIN,
              filters.maxPrice ?? OFFER_PRICE_FILTER_MAX,
            ]}
            selectedCategories={filters.category}
          />

          <div className="min-w-0">
            {offersStatus === "failed" ? (
              <p className="rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.92)] bg-(--voyana-color-background-section) p-5 text-sm font-bold text-(--voyana-color-text-muted)">
                {offersError ?? "Offers could not be loaded."}
              </p>
            ) : offers.length > 0 ? (
              <div className="grid gap-4">
                {offers.map((offer) => (
                  <OfferCard key={offer._id} offer={offer} />
                ))}
              </div>
            ) : (
              <p className="rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.92)] bg-(--voyana-color-background-section) p-5 text-sm font-bold text-(--voyana-color-text-muted)">
                {offersStatus === "loading"
                  ? "Loading offers..."
                  : "No offers available"}
              </p>
            )}
          </div>
        </div>
      </div>
    </PublicPageShell>
  );
};
