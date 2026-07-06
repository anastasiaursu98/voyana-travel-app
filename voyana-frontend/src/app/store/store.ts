import { configureStore } from "@reduxjs/toolkit";
import destinationsReducer from "../../features/destinations/store/destinationsSlice";
import offersReducer from "../../features/offers/store/offersSlice";

export const store = configureStore({
  reducer: {
    destinations: destinationsReducer,
    offers: offersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
