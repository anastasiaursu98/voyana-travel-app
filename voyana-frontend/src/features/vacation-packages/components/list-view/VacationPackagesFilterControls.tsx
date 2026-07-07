import {
  AmountSliderFilter,
  CollapsibleFilterSection,
  FilterCheckboxOption,
} from "../../../../shared/components/filters";
import { useVacationPackageFilterCategories } from "../../hooks/useVacationPackageFilterCategories";
import {
  PACKAGE_PRICE_FILTER_MAX,
  PACKAGE_PRICE_FILTER_MIN,
} from "../../hooks/useVacationPackagesFilters";

interface VacationPackagesFilterControlsProps {
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  priceRange: [number, number];
  selectedCategories?: Array<string>;
}

export function VacationPackagesFilterControls({
  onCategoryChange,
  onPriceRangeChange,
  priceRange,
  selectedCategories,
}: VacationPackagesFilterControlsProps) {
  const { categories } = useVacationPackageFilterCategories();

  return (
    <>
      <AmountSliderFilter
        max={PACKAGE_PRICE_FILTER_MAX}
        min={PACKAGE_PRICE_FILTER_MIN}
        onChange={onPriceRangeChange}
        title="Price"
        value={priceRange}
      />

      <CollapsibleFilterSection title="Category">
        {categories.map((option) => (
          <FilterCheckboxOption
            key={option.label}
            checked={selectedCategories?.includes(option.value) ?? false}
            {...option}
            onChange={() => onCategoryChange(option.value)}
          />
        ))}
      </CollapsibleFilterSection>
    </>
  );
}
