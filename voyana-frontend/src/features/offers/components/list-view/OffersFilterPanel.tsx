import {
  AmountSliderFilter,
  CollapsibleFilterSection,
  FilterCheckboxOption,
  FilterPanel,
} from "../../../../shared/components/filters";
import { useOfferCategories } from "../../hooks/useOfferCategories";
import {
  OFFER_PRICE_FILTER_MAX,
  OFFER_PRICE_FILTER_MIN,
} from "../../hooks/useOffersFilters";

interface OffersFilterPanelProps {
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  priceRange: [number, number];
  selectedCategories?: Array<string>;
}

export function OffersFilterPanel({
  onCategoryChange,
  onPriceRangeChange,
  priceRange,
  selectedCategories,
}: OffersFilterPanelProps) {
  const { categories } = useOfferCategories();

  return (
    <FilterPanel
      aria-label="Offer filters"
      description="Narrow your stay preferences"
    >
      <AmountSliderFilter
        max={OFFER_PRICE_FILTER_MAX}
        min={OFFER_PRICE_FILTER_MIN}
        onChange={onPriceRangeChange}
        title="Price"
        value={priceRange}
      />

      <CollapsibleFilterSection
        // icon={<cate}
        key={"Category"}
        title={"Category"}
      >
        {categories?.map((option) => (
          <FilterCheckboxOption
            key={option.label}
            checked={selectedCategories?.includes(option.value) ?? false}
            {...option}
            onChange={() => onCategoryChange(option.value)}
          />
        ))}
      </CollapsibleFilterSection>
    </FilterPanel>
  );
}
