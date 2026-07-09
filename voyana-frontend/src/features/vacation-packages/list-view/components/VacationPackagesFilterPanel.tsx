import { FilterPanel } from "../../../../shared/components/filters";
import type { VacationPackageFilters } from "../types/vacationPackageFilters.types";
import { VacationPackagesFilterControls } from "./VacationPackagesFilterControls";

interface VacationPackagesFilterPanelProps {
  onFilterOptionToggle: (filterValue: string, filterParamName: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onReset: () => void;
  priceRange: [number, number];
  filters?: VacationPackageFilters;
}

export function VacationPackagesFilterPanel({
  onFilterOptionToggle,
  onPriceRangeChange,
  onReset,
  priceRange,
  filters,
}: VacationPackagesFilterPanelProps) {
  return (
    <FilterPanel
      aria-label="Vacation package filters"
      onReset={onReset}
    >
      <VacationPackagesFilterControls
        onFilterOptionToggle={onFilterOptionToggle}
        onPriceRangeChange={onPriceRangeChange}
        priceRange={priceRange}
        filters={filters}
      />
    </FilterPanel>
  );
}
