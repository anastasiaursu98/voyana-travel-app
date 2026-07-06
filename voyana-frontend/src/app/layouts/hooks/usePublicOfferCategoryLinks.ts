import { useMemo } from "react";
import { useOfferCategories } from "../../../features/offer-categories/hooks/useOfferCategories";
import { routes } from "../../router/routes";

export function usePublicOfferCategoryLinks() {
  const { categories, categoriesError, categoriesStatus } = useOfferCategories();

  const offerCategoryLinks = useMemo(
    () =>
      categories.map((category) => ({
        description: category.description,
        label: category.label,
        to: `${routes.offers}?category=${encodeURIComponent(category.value)}`,
        value: category.value,
      })),
    [categories],
  );

  return {
    categories,
    categoriesError,
    categoriesStatus,
    offerCategoryLinks,
  };
}
