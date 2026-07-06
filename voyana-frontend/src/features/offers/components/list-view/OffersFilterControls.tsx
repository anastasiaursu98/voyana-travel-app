import {
  AmountSliderFilter,
  CollapsibleFilterSection,
  FilterCheckboxOption,
} from "../../../../shared/components/filters";
import { useOfferFilterCategories } from "../../hooks/useOfferFilterCategories";
import {
  OFFER_PRICE_FILTER_MAX,
  OFFER_PRICE_FILTER_MIN,
} from "../../hooks/useOffersFilters";

interface OffersFilterControlsProps {
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  priceRange: [number, number];
  selectedCategories?: Array<string>;
}

export function OffersFilterControls({
  onCategoryChange,
  onPriceRangeChange,
  priceRange,
  selectedCategories,
}: OffersFilterControlsProps) {
  const { categories } = useOfferFilterCategories();

  return (
    <>
      <AmountSliderFilter
        max={OFFER_PRICE_FILTER_MAX}
        min={OFFER_PRICE_FILTER_MIN}
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
