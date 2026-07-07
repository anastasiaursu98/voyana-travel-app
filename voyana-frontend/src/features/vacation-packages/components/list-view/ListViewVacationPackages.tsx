import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import { PublicPageShell } from "../../../../shared/components/PublicPageShell";
import { SectionHeader } from "../../../../shared/components/SectionHeader";
import {
  PACKAGE_PRICE_FILTER_MAX,
  PACKAGE_PRICE_FILTER_MIN,
  useVacationPackagesFilters,
} from "../../hooks/useVacationPackagesFilters";
import { useMobileVacationPackageFilters } from "../../hooks/useMobileVacationPackageFilters";
import {
  fetchVacationPackages,
  selectVacationPackages,
  selectVacationPackagesError,
  selectVacationPackagesStatus,
} from "../../store/vacationPackagesSlice";
import { VacationPackageCard } from "./VacationPackageCard";
import { VacationPackagesFilterControls } from "./VacationPackagesFilterControls";
import { VacationPackagesFilterPanel } from "./VacationPackagesFilterPanel";
import { VacationPackagesMobileFilterDrawer } from "./VacationPackagesMobileFilterDrawer";

export const ListViewVacationPackages = () => {
  const dispatch = useAppDispatch();
  const vacationPackages = useAppSelector(selectVacationPackages);
  const vacationPackagesStatus = useAppSelector(selectVacationPackagesStatus);
  const vacationPackagesError = useAppSelector(selectVacationPackagesError);

  const {
    filters,
    handleCategoryChange,
    handleFiltersReset,
    handlePriceRangeChange,
  } = useVacationPackagesFilters();
  const {
    handleMobileFiltersClose,
    handleMobileFiltersOpen,
    isMobileFiltersOpen,
    mobileFiltersRef,
  } = useMobileVacationPackageFilters();

  useEffect(() => {
    void dispatch(fetchVacationPackages(filters));
  }, [dispatch, filters]);

  return (
    <PublicPageShell>
      <div className="grid gap-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            title="Vacation packages"
            description="Compare curated travel packages with clear prices, trip details, and handpicked stays."
            className="max-w-3xl"
          />
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-(--voyana-color-background-section) px-4 py-2 text-sm font-black text-(--voyana-color-text-primary)">
              {vacationPackages.length} packages
            </span>
            <span className="rounded-full bg-[rgb(var(--voyana-rgb-accent-teal)/0.11)] px-4 py-2 text-sm font-black text-(--voyana-color-accent-teal-strong)">
              Curated deals
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start">
          <div className="hidden lg:block">
            <VacationPackagesFilterPanel
              onCategoryChange={handleCategoryChange}
              onPriceRangeChange={handlePriceRangeChange}
              onReset={handleFiltersReset}
              priceRange={[
                filters.minPrice ?? PACKAGE_PRICE_FILTER_MIN,
                filters.maxPrice ?? PACKAGE_PRICE_FILTER_MAX,
              ]}
              selectedCategories={filters.category}
            />
          </div>

          <div className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
              <p className="text-sm font-bold text-(--voyana-color-text-muted)">
                Refine vacation packages by price and category.
              </p>
              <button
                type="button"
                onClick={handleMobileFiltersOpen}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-(--voyana-color-background-dark) px-4 text-sm font-black text-(--voyana-color-white) shadow-[0_14px_28px_rgb(var(--voyana-rgb-background-dark)/0.16)] transition hover:-translate-y-0.5 hover:bg-(--voyana-color-text-strong) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.22)]"
                aria-expanded={isMobileFiltersOpen}
                aria-controls="mobile-vacation-package-filters"
              >
                Filters
              </button>
            </div>

            {vacationPackagesStatus === "failed" ? (
              <p className="rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.92)] bg-(--voyana-color-background-section) p-5 text-sm font-bold text-(--voyana-color-text-muted)">
                {vacationPackagesError ??
                  "Vacation packages could not be loaded."}
              </p>
            ) : vacationPackages.length > 0 ? (
              <div className="grid gap-4">
                {vacationPackages.map((vacationPackage) => (
                  <VacationPackageCard key={vacationPackage._id} vacationPackage={vacationPackage} />
                ))}
              </div>
            ) : (
              <p className="rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.92)] bg-(--voyana-color-background-section) p-5 text-sm font-bold text-(--voyana-color-text-muted)">
                {vacationPackagesStatus === "loading"
                  ? "Loading vacation packages..."
                  : "No vacation packages available"}
              </p>
            )}
          </div>
        </div>
      </div>
      <VacationPackagesMobileFilterDrawer
        isOpen={isMobileFiltersOpen}
        onClose={handleMobileFiltersClose}
        panelRef={mobileFiltersRef}
      >
        <div id="mobile-vacation-package-filters">
          <VacationPackagesFilterControls
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={handlePriceRangeChange}
            priceRange={[
              filters.minPrice ?? PACKAGE_PRICE_FILTER_MIN,
              filters.maxPrice ?? PACKAGE_PRICE_FILTER_MAX,
            ]}
            selectedCategories={filters.category}
          />
        </div>
      </VacationPackagesMobileFilterDrawer>
    </PublicPageShell>
  );
};
