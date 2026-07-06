import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  fetchOfferCategories,
  selectOfferCategories,
  selectOfferCategoriesError,
  selectOfferCategoriesStatus,
} from "../store/offersSlice";

export const useOfferCategories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectOfferCategories);
  const categoriesStatus = useAppSelector(selectOfferCategoriesStatus);
  const categoriesError = useAppSelector(selectOfferCategoriesError);

  useEffect(() => {
    dispatch(fetchOfferCategories());
  }, [dispatch]);
  return { categories, categoriesStatus, categoriesError };
};
