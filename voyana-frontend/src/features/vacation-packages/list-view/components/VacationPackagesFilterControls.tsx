import {
  AmountSliderFilter,
  CollapsibleFilterSection,
  FilterCheckboxOption,
} from "../../../../shared/components/filters";
import { useVacationPackageFilterOptions } from "../hooks/useVacationPackageFilterOptions";
import {
  PACKAGE_PRICE_FILTER_MAX,
  PACKAGE_PRICE_FILTER_MIN,
} from "../hooks/useVacationPackagesFilters";
import type { VacationPackageFilters } from "../types/vacationPackageFilters.types";
import { getVacationPackageCheckboxFilterSections } from "./vacationPackagesFilterSections";

interface VacationPackagesFilterControlsProps {
  onFilterOptionToggle: (filterValue: string, filterParamName: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  priceRange: [number, number];
  filters?: VacationPackageFilters;
}

export function VacationPackagesFilterControls({
  onFilterOptionToggle,
  onPriceRangeChange,
  priceRange,
  filters,
}: VacationPackagesFilterControlsProps) {
  const {
    categories,
    dealTypes,
    mealPlans,
    accommodationTypes,
    availabilityStatuses,
    transportationTypes,
  } = useVacationPackageFilterOptions();

  const checkboxFilterSections = getVacationPackageCheckboxFilterSections(
    {
      accommodationTypes,
      availabilityStatuses,
      categories,
      dealTypes,
      mealPlans,
      transportationTypes,
    },
    filters,
  );

  return (
    <>
      <AmountSliderFilter
        max={PACKAGE_PRICE_FILTER_MAX}
        min={PACKAGE_PRICE_FILTER_MIN}
        onChange={onPriceRangeChange}
        title="Price"
        value={priceRange}
      />
      {checkboxFilterSections.map(
        ({ title, options, selectedValues, paramName }) => (
          <CollapsibleFilterSection
            key={title}
            defaultOpen={selectedValues.length > 0}
            selectedCount={selectedValues.length}
            supportingText={`${options?.length ?? 0} options`}
            title={title}
            totalCount={options?.length}
          >
            {options?.map(({ count, label, value }) => (
              <FilterCheckboxOption
                key={value}
                checked={selectedValues.includes(value)}
                count={count}
                label={label}
                onChange={() => onFilterOptionToggle(value, paramName)}
              />
            ))}
          </CollapsibleFilterSection>
        ),
      )}
    </>
  );
}
