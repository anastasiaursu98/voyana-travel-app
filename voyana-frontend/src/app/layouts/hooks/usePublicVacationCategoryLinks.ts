import { useMemo } from "react";
import { useVacationCategories } from "../../../features/vacation-categories/hooks/useVacationCategories";
import { routes } from "../../router/routes";

export function usePublicVacationCategoryLinks() {
  const { categories, categoriesError, categoriesStatus } = useVacationCategories();

  const vacationCategoryLinks = useMemo(
    () =>
      categories.map((category) => ({
        description: category.description,
        label: category.label,
        to: `${routes.vacationPackages}?category=${encodeURIComponent(category.value)}`,
        value: category.value,
      })),
    [categories],
  );

  return {
    categories,
    categoriesError,
    categoriesStatus,
    vacationCategoryLinks,
  };
}
