import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/store";
import type { VacationCategory } from "../../vacation-packages/types/vacationPackage.types";
import { vacationCategoriesApi } from "../api/vacationCategoriesApi";

type VacationCategoryStatus = "idle" | "loading" | "succeeded" | "failed";

type VacationCategoriesState = {
  categories: Array<VacationCategory>;
  error: string | null;
  status: VacationCategoryStatus;
};

const initialState: VacationCategoriesState = {
  categories: [],
  error: null,
  status: "idle",
};

export const fetchVacationCategories = createAsyncThunk(
  "vacationCategories/fetchVacationCategories",
  async () => vacationCategoriesApi.getVacationCategories(),
  {
    condition: (_, { getState }) => {
      const state = (getState() as RootState)
        .vacationCategories as VacationCategoriesState;

      return state.status !== "loading" && state.status !== "succeeded";
    },
  },
);

const vacationCategoriesSlice = createSlice({
  name: "vacationCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacationCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVacationCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchVacationCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const selectVacationCategories = (state: RootState) =>
  (state.vacationCategories as VacationCategoriesState).categories;
export const selectVacationCategoriesStatus = (state: RootState) =>
  (state.vacationCategories as VacationCategoriesState).status;
export const selectVacationCategoriesError = (state: RootState) =>
  (state.vacationCategories as VacationCategoriesState).error;

export default vacationCategoriesSlice.reducer;
