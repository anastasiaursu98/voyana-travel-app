import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { VacationPackageFilters } from "../types/vacationPackageFilters.types";

export const PACKAGE_PRICE_FILTER_MIN = 0;
export const PACKAGE_PRICE_FILTER_MAX = 2500;

const getPriceParam = (value: string | null) => {
  if (!value) {
    return undefined;
  }

  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return undefined;
  }

  return parsedValue;
};

export const useVacationPackagesFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination") ?? undefined;
  const category = searchParams.getAll("category");
  const categoryKey = category.join(",");
  const minPrice = getPriceParam(searchParams.get("minPrice"));
  const maxPrice = getPriceParam(searchParams.get("maxPrice"));
  const campaignType = searchParams.getAll("campaignType");
  const campaignTypeKey = campaignType.join(",");
  const mealPlan = searchParams.getAll("mealPlan");
  const mealPlanKey = mealPlan.join(",");
  const accommodationType = searchParams.getAll("accommodationType");
  const accommodationTypeKey = accommodationType.join(",");
  const availabilityStatus = searchParams.getAll("availabilityStatus");
  const availabilityStatusKey = availabilityStatus.join(",");
  const transportationType = searchParams.getAll("transportationType");
  const transportationTypeKey = transportationType.join(",");

  const filters: VacationPackageFilters = useMemo(
    () => ({
      destination,
      category: category.length > 0 ? category : undefined,
      minPrice,
      maxPrice,
      campaignType: campaignType.length > 0 ? campaignType : undefined,
      mealPlan: mealPlan.length > 0 ? mealPlan : undefined,
      accommodationType:
        accommodationType.length > 0 ? accommodationType : undefined,
      availabilityStatus:
        availabilityStatus.length > 0 ? availabilityStatus : undefined,
      transportationType:
        transportationType.length > 0 ? transportationType : undefined,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      destination,
      categoryKey,
      minPrice,
      maxPrice,
      campaignTypeKey,
      mealPlanKey,
      accommodationTypeKey,
      availabilityStatusKey,
      transportationTypeKey,
    ],
  );

  const handleFilterOptionToggle = (
    filterValue: string,
    filterParamName: string,
  ) => {
    const nextParams = new URLSearchParams(searchParams);
    const currentFilterValues = nextParams.getAll(filterParamName);
    nextParams.delete(filterParamName);
    const nextFilterValues = currentFilterValues.includes(filterValue)
      ? currentFilterValues.filter(
          (currentValue) => currentValue !== filterValue,
        )
      : [...currentFilterValues, filterValue];

    nextFilterValues.forEach((nextValue) => {
      nextParams.append(filterParamName, nextValue);
    });
    setSearchParams(nextParams);
  };

  const handlePriceRangeChange = ([nextMinPrice, nextMaxPrice]: [
    number,
    number,
  ]) => {
    const nextParams = new URLSearchParams(searchParams);

    if (nextMinPrice <= PACKAGE_PRICE_FILTER_MIN) {
      nextParams.delete("minPrice");
    } else {
      nextParams.set("minPrice", String(nextMinPrice));
    }

    if (nextMaxPrice >= PACKAGE_PRICE_FILTER_MAX) {
      nextParams.delete("maxPrice");
    } else {
      nextParams.set("maxPrice", String(nextMaxPrice));
    }

    setSearchParams(nextParams);
  };

  const handleFiltersReset = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("category");
    nextParams.delete("minPrice");
    nextParams.delete("maxPrice");
    nextParams.delete("campaignType");
    nextParams.delete("mealPlan");
    nextParams.delete("accommodationType");
    nextParams.delete("availabilityStatus");
    nextParams.delete("transportationType");
    setSearchParams(nextParams);
  };

  return {
    filters,
    handleFilterOptionToggle,
    handleFiltersReset,
    handlePriceRangeChange,
  };
};
