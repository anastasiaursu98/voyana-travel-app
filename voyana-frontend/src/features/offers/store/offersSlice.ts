import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/store";
import { offersApi } from "../api/offersApi";
import type { Offer, OfferFilters } from "../types/offer.types";

type OfferStatus = "idle" | "loading" | "succeeded" | "failed";
type OffersState = {
  offers: Array<Offer>;
  status: OfferStatus;
  error: string | null;

  offersById: Offer | null;
  offerByIdStatus: OfferStatus;
  offerByIdRequest: {
    offerCode: string;
    offerId: string;
  } | null;

  offerByIdError: string | null;
};

const initialState: OffersState = {
  offers: [],
  status: "idle",
  error: null,

  offersById: null,
  offerByIdStatus: "idle",
  offerByIdRequest: null,
  offerByIdError: null,
};

export const fetchOffers = createAsyncThunk(
  "offers/fetchOffers",
  async (params?: OfferFilters) => offersApi.getOffers(params),
);

export const fetchOfferById = createAsyncThunk(
  "offers/fetchOfferById",
  async ({ offerId, offerCode }: { offerId: string; offerCode: string }) =>
    offersApi.getOfferById(offerId, offerCode),
);

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchOfferById.pending, (state, action) => {
        state.offerByIdStatus = "loading";
        state.offerByIdRequest = action.meta.arg;
        state.offerByIdError = null;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.offerByIdStatus = "succeeded";
        state.offersById = action.payload;
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.offerByIdStatus = "failed";
        state.offerByIdError = action.error.message || "Something went wrong";
      });
  },
});

export const selectOffers = (state: RootState) =>
  (state.offers as OffersState).offers;
export const selectOffersStatus = (state: RootState) =>
  (state.offers as OffersState).status;
export const selectOffersError = (state: RootState) =>
  (state.offers as OffersState).error;

export const selectOfferById = (state: RootState) =>
  (state.offers as OffersState).offersById;

export const selectOfferByIdStatus = (state: RootState) =>
  (state.offers as OffersState).offerByIdStatus;
export const selectOfferByIdError = (state: RootState) =>
  (state.offers as OffersState).offerByIdError;
export const selectOfferByIdRequest = (state: RootState) =>
  (state.offers as OffersState).offerByIdRequest;

export default offersSlice.reducer;
