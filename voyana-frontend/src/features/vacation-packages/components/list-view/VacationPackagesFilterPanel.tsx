import { FilterPanel } from "../../../../shared/components/filters";
import { VacationPackagesFilterControls } from "./VacationPackagesFilterControls";

interface VacationPackagesFilterPanelProps {
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onReset: () => void;
  priceRange: [number, number];
  selectedCategories?: Array<string>;
}

export function VacationPackagesFilterPanel({
  onCategoryChange,
  onPriceRangeChange,
  onReset,
  priceRange,
  selectedCategories,
}: VacationPackagesFilterPanelProps) {
  return (
    <FilterPanel
      aria-label="Vacation package filters"
      description="Narrow your stay preferences"
      onReset={onReset}
    >
      <VacationPackagesFilterControls
        onCategoryChange={onCategoryChange}
        onPriceRangeChange={onPriceRangeChange}
        priceRange={priceRange}
        selectedCategories={selectedCategories}
      />
    </FilterPanel>
  );
}
