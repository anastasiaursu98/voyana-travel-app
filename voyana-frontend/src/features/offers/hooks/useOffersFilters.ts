import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { OfferFilters } from "../types/offer.types";

export const OFFER_PRICE_FILTER_MIN = 0;
export const OFFER_PRICE_FILTER_MAX = 2500;

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

export const useOffersFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination") ?? undefined;
  const category = searchParams.getAll("category");
  const categoryKey = category.join(",");
  const minPrice = getPriceParam(searchParams.get("minPrice"));
  const maxPrice = getPriceParam(searchParams.get("maxPrice"));

  const filters: OfferFilters = useMemo(
    () => ({
      destination,
      category: category.length > 0 ? category : undefined,
      minPrice,
      maxPrice,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [destination, categoryKey, minPrice, maxPrice],
  );

  const handleCategoryChange = (category: string) => {
    const nextParams = new URLSearchParams(searchParams);
    const currentCategory = nextParams.getAll("category");
    nextParams.delete("category");
    const nextCategories = currentCategory.includes(category)
      ? currentCategory.filter((c) => c !== category)
      : [...currentCategory, category];

    nextCategories.forEach((item) => {
      nextParams.append("category", item);
    });
    setSearchParams(nextParams);
  };

  const handlePriceRangeChange = ([nextMinPrice, nextMaxPrice]: [
    number,
    number,
  ]) => {
    const nextParams = new URLSearchParams(searchParams);

    if (nextMinPrice <= OFFER_PRICE_FILTER_MIN) {
      nextParams.delete("minPrice");
    } else {
      nextParams.set("minPrice", String(nextMinPrice));
    }

    if (nextMaxPrice >= OFFER_PRICE_FILTER_MAX) {
      nextParams.delete("maxPrice");
    } else {
      nextParams.set("maxPrice", String(nextMaxPrice));
    }

    setSearchParams(nextParams);
  };

  return { filters, handleCategoryChange, handlePriceRangeChange };
};
