import { useMemo } from "react";
import { routes } from "../../../app/router/routes";
import { useVacationCategories } from "../../vacation-categories/hooks/useVacationCategories";

export function useHomeVacationCategoryLinks(limit = 6) {
  const { categories, categoriesError, categoriesStatus } = useVacationCategories();

  const vacationCategoryLinks = useMemo(
    () =>
      categories.slice(0, limit).map((category) => ({
        description: category.description,
        label: category.label,
        to: `${routes.vacationPackages}?category=${encodeURIComponent(category.value)}`,
        value: category.value,
      })),
    [categories, limit],
  );

  return {
    categoriesError,
    categoriesStatus,
    vacationCategoryLinks,
  };
}
