import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  fetchVacationCategories,
  selectVacationCategories,
  selectVacationCategoriesError,
  selectVacationCategoriesStatus,
} from "../store/vacationCategoriesSlice";

export function useVacationCategories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectVacationCategories);
  const categoriesStatus = useAppSelector(selectVacationCategoriesStatus);
  const categoriesError = useAppSelector(selectVacationCategoriesError);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      void dispatch(fetchVacationCategories());
    }
  }, [categoriesStatus, dispatch]);

  return { categories, categoriesError, categoriesStatus };
}
