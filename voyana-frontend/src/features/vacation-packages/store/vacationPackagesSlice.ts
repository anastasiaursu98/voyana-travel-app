import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/store";
import { vacationPackagesApi } from "../api/vacationPackagesApi";
import type { VacationPackageFilterOptions } from "../list-view/types/vacationPackageFilterOptions";
import type { VacationPackageFilters } from "../list-view/types/vacationPackageFilters.types";
import type { VacationPackage } from "../types/vacationPackage.types";

type VacationPackageStatus = "idle" | "loading" | "succeeded" | "failed";
type VacationPackagesState = {
  vacationPackages: Array<VacationPackage>;
  status: VacationPackageStatus;
  error: string | null;

  vacationPackagesById: VacationPackage | null;
  vacationPackageByIdStatus: VacationPackageStatus;
  vacationPackageByIdRequest: {
    vacationPackageCode: string;
    vacationPackageId: string;
  } | null;
  vacationPackageByIdError: string | null;

  filterOptions: VacationPackageFilterOptions | null;
  filterOptionsStatus: VacationPackageStatus;
  filterOptionsError: string | null;
};

const initialState: VacationPackagesState = {
  vacationPackages: [],
  status: "idle",
  error: null,

  vacationPackagesById: null,
  vacationPackageByIdStatus: "idle",
  vacationPackageByIdRequest: null,
  vacationPackageByIdError: null,

  filterOptions: null,
  filterOptionsStatus: "idle",
  filterOptionsError: null,
};

export const fetchVacationPackages = createAsyncThunk(
  "vacationPackages/fetchVacationPackages",
  async (params?: VacationPackageFilters) =>
    vacationPackagesApi.getVacationPackages(params),
);

export const fetchVacationPackageById = createAsyncThunk(
  "vacationPackages/fetchVacationPackageById",
  async ({
    vacationPackageId,
    vacationPackageCode,
  }: {
    vacationPackageId: string;
    vacationPackageCode: string;
  }) =>
    vacationPackagesApi.getVacationPackageById(
      vacationPackageId,
      vacationPackageCode,
    ),
);

export const fetchVacationFiltersOptions = createAsyncThunk(
  "vacationPackages/fetchVacationFiltersOptions",
  async (destination?: string) =>
    vacationPackagesApi.getVacationFiltersOptions(destination),
);
const vacationPackagesSlice = createSlice({
  name: "vacationPackages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacationPackages.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVacationPackages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vacationPackages = action.payload;
      })
      .addCase(fetchVacationPackages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchVacationPackageById.pending, (state, action) => {
        state.vacationPackageByIdStatus = "loading";
        state.vacationPackageByIdRequest = action.meta.arg;
        state.vacationPackageByIdError = null;
      })
      .addCase(fetchVacationPackageById.fulfilled, (state, action) => {
        state.vacationPackageByIdStatus = "succeeded";
        state.vacationPackagesById = action.payload;
      })
      .addCase(fetchVacationPackageById.rejected, (state, action) => {
        state.vacationPackageByIdStatus = "failed";
        state.vacationPackageByIdError =
          action.error.message || "Something went wrong";
      })
      .addCase(fetchVacationFiltersOptions.pending, (state) => {
        state.filterOptionsStatus = "loading";
        state.filterOptionsError = null;
      })
      .addCase(fetchVacationFiltersOptions.fulfilled, (state, action) => {
        state.filterOptionsStatus = "succeeded";
        state.filterOptions = action.payload;
      })
      .addCase(fetchVacationFiltersOptions.rejected, (state, action) => {
        state.filterOptionsStatus = "failed";
        state.filterOptionsError =
          action.error.message || "Something went wrong";
      });
  },
});

export const selectVacationPackages = (state: RootState) =>
  (state.vacationPackages as VacationPackagesState).vacationPackages;
export const selectVacationPackagesStatus = (state: RootState) =>
  (state.vacationPackages as VacationPackagesState).status;
export const selectVacationPackagesError = (state: RootState) =>
  (state.vacationPackages as VacationPackagesState).error;

export const selectVacationPackageById = (state: RootState) =>
  (state.vacationPackages as VacationPackagesState).vacationPackagesById;

export const selectVacationPackageByIdStatus = (state: RootState) =>
  (state.vacationPackages as VacationPackagesState).vacationPackageByIdStatus;
export const selectVacationPackageByIdError = (state: RootState) =>
  (state.vacationPackages as VacationPackagesState).vacationPackageByIdError;
export const selectVacationPackageByIdRequest = (state: RootState) =>
  (state.vacationPackages as VacationPackagesState).vacationPackageByIdRequest;

export const selectVacationFiltersOptions = (state: RootState) =>
  (state.vacationPackages as VacationPackagesState).filterOptions;
export const selectVacationFiltersOptionsStatus = (state: RootState) =>
  (state.vacationPackages as VacationPackagesState).filterOptionsStatus;
export const selectVacationFiltersOptionsError = (state: RootState) =>
  (state.vacationPackages as VacationPackagesState).filterOptionsError;

export default vacationPackagesSlice.reducer;
