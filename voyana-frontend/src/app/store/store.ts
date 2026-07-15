import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/store/authSlice";
import destinationsReducer from "../../features/destinations/store/destinationsSlice";
import vacationCategoriesReducer from "../../features/vacation-categories/store/vacationCategoriesSlice";
import { vacationPackagesReducer } from "../../features/vacation-packages";
export const store = configureStore({
  reducer: {
    destinations: destinationsReducer,
    vacationCategories: vacationCategoriesReducer,
    vacationPackages: vacationPackagesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
