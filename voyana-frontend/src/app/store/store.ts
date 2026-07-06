import { configureStore } from "@reduxjs/toolkit";
import destinationsReducer from "../../features/destinations/store/destinationsSlice";
import offerCategoriesReducer from "../../features/offer-categories/store/offerCategoriesSlice";
import offersReducer from "../../features/offers/store/offersSlice";

export const store = configureStore({
  reducer: {
    destinations: destinationsReducer,
    offerCategories: offerCategoriesReducer,
    offers: offersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
