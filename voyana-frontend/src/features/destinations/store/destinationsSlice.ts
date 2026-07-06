import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store/store'
import { destinationsApi } from '../api/destinationsApi'
import type { DashboardDestination } from '../types/destination.types'

type DestinationsStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type DestinationsState = {
  items: DashboardDestination[]
  status: DestinationsStatus
  error: string | null
}

const initialState: DestinationsState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchDestinations = createAsyncThunk(
  'destinations/fetchDestinations',
  async () => destinationsApi.getDestinations(),
)

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinations.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchDestinations.rejected, (state) => {
        state.status = 'failed'
        state.error = 'We could not load destinations right now.'
      })
  },
})

export const selectDestinations = (state: RootState) => state.destinations.items
export const selectDestinationsStatus = (state: RootState) => state.destinations.status
export const selectDestinationsError = (state: RootState) => state.destinations.error

export default destinationsSlice.reducer
