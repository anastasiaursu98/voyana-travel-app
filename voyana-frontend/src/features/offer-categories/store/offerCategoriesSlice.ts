import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/store";
import { offerCategoriesApi } from "../api/offerCategoriesApi";
import type { OfferCategory } from "../types/offerCategory.types";

type OfferCategoryStatus = "idle" | "loading" | "succeeded" | "failed";

type OfferCategoriesState = {
  categories: Array<OfferCategory>;
  error: string | null;
  status: OfferCategoryStatus;
};

const initialState: OfferCategoriesState = {
  categories: [],
  error: null,
  status: "idle",
};

export const fetchOfferCategories = createAsyncThunk(
  "offerCategories/fetchOfferCategories",
  async () => offerCategoriesApi.getOfferCategories(),
);

const offerCategoriesSlice = createSlice({
  name: "offerCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOfferCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchOfferCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const selectOfferCategories = (state: RootState) =>
  (state.offerCategories as OfferCategoriesState).categories;
export const selectOfferCategoriesStatus = (state: RootState) =>
  (state.offerCategories as OfferCategoriesState).status;
export const selectOfferCategoriesError = (state: RootState) =>
  (state.offerCategories as OfferCategoriesState).error;

export default offerCategoriesSlice.reducer;
