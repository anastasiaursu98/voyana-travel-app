import { useMemo } from "react";
import { routes } from "../../../app/router/routes";
import { useOfferCategories } from "../../offer-categories/hooks/useOfferCategories";

export function useHomeOfferCategoryLinks(limit = 6) {
  const { categories, categoriesError, categoriesStatus } = useOfferCategories();

  const offerCategoryLinks = useMemo(
    () =>
      categories.slice(0, limit).map((category) => ({
        description: category.description,
        label: category.label,
        to: `${routes.offers}?category=${encodeURIComponent(category.value)}`,
        value: category.value,
      })),
    [categories, limit],
  );

  return {
    categoriesError,
    categoriesStatus,
    offerCategoryLinks,
  };
}
