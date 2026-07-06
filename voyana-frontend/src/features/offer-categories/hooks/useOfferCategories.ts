import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  fetchOfferCategories,
  selectOfferCategories,
  selectOfferCategoriesError,
  selectOfferCategoriesStatus,
} from "../store/offerCategoriesSlice";

export function useOfferCategories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectOfferCategories);
  const categoriesStatus = useAppSelector(selectOfferCategoriesStatus);
  const categoriesError = useAppSelector(selectOfferCategoriesError);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      void dispatch(fetchOfferCategories());
    }
  }, [categoriesStatus, dispatch]);

  return { categories, categoriesError, categoriesStatus };
}
