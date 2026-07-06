import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import { PublicPageShell } from "../../../../shared/components/PublicPageShell";
import { SectionHeader } from "../../../../shared/components/SectionHeader";
import {
  OFFER_PRICE_FILTER_MAX,
  OFFER_PRICE_FILTER_MIN,
  useOffersFilters,
} from "../../hooks/useOffersFilters";
import { useMobileOfferFilters } from "../../hooks/useMobileOfferFilters";
import {
  fetchOffers,
  selectOffers,
  selectOffersError,
  selectOffersStatus,
} from "../../store/offersSlice";
import { OfferCard } from "./OfferCard";
import { OffersFilterControls } from "./OffersFilterControls";
import { OffersFilterPanel } from "./OffersFilterPanel";
import { OffersMobileFilterDrawer } from "./OffersMobileFilterDrawer";

export const ListViewOffers = () => {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(selectOffers);
  const offersStatus = useAppSelector(selectOffersStatus);
  const offersError = useAppSelector(selectOffersError);

  const {
    filters,
    handleCategoryChange,
    handleFiltersReset,
    handlePriceRangeChange,
  } = useOffersFilters();
  const {
    handleMobileFiltersClose,
    handleMobileFiltersOpen,
    isMobileFiltersOpen,
    mobileFiltersRef,
  } = useMobileOfferFilters();

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
          <div className="hidden lg:block">
            <OffersFilterPanel
              onCategoryChange={handleCategoryChange}
              onPriceRangeChange={handlePriceRangeChange}
              onReset={handleFiltersReset}
              priceRange={[
                filters.minPrice ?? OFFER_PRICE_FILTER_MIN,
                filters.maxPrice ?? OFFER_PRICE_FILTER_MAX,
              ]}
              selectedCategories={filters.category}
            />
          </div>

          <div className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
              <p className="text-sm font-bold text-(--voyana-color-text-muted)">
                Refine offers by price and category.
              </p>
              <button
                type="button"
                onClick={handleMobileFiltersOpen}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-(--voyana-color-background-dark) px-4 text-sm font-black text-(--voyana-color-white) shadow-[0_14px_28px_rgb(var(--voyana-rgb-background-dark)/0.16)] transition hover:-translate-y-0.5 hover:bg-(--voyana-color-text-strong) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.22)]"
                aria-expanded={isMobileFiltersOpen}
                aria-controls="mobile-offer-filters"
              >
                Filters
              </button>
            </div>

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
      <OffersMobileFilterDrawer
        isOpen={isMobileFiltersOpen}
        onClose={handleMobileFiltersClose}
        panelRef={mobileFiltersRef}
      >
        <div id="mobile-offer-filters">
          <OffersFilterControls
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={handlePriceRangeChange}
            priceRange={[
              filters.minPrice ?? OFFER_PRICE_FILTER_MIN,
              filters.maxPrice ?? OFFER_PRICE_FILTER_MAX,
            ]}
            selectedCategories={filters.category}
          />
        </div>
      </OffersMobileFilterDrawer>
    </PublicPageShell>
  );
};
