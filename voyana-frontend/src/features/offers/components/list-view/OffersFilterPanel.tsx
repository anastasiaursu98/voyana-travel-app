import { FilterPanel } from "../../../../shared/components/filters";
import { OffersFilterControls } from "./OffersFilterControls";

interface OffersFilterPanelProps {
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onReset: () => void;
  priceRange: [number, number];
  selectedCategories?: Array<string>;
}

export function OffersFilterPanel({
  onCategoryChange,
  onPriceRangeChange,
  onReset,
  priceRange,
  selectedCategories,
}: OffersFilterPanelProps) {
  return (
    <FilterPanel
      aria-label="Offer filters"
      description="Narrow your stay preferences"
      onReset={onReset}
    >
      <OffersFilterControls
        onCategoryChange={onCategoryChange}
        onPriceRangeChange={onPriceRangeChange}
        priceRange={priceRange}
        selectedCategories={selectedCategories}
      />
    </FilterPanel>
  );
}
