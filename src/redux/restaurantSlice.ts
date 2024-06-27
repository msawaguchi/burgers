import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk,
} from '@reduxjs/toolkit'
import restaurantInfo from '../resources/restaurant.json'
import { RestaurantState, StateRestaurantSlice } from '../lib/definitions'

const initialState: StateRestaurantSlice = {
  data: null,
  status: 'idle',
  error: null,
}

const URL_RESTAURANT_DETAILS = 'https://cdn-dev.preoday.com/challenge/venue/9'

export const fetchRestaurantInfo: AsyncThunk<RestaurantState, void, object> =
  createAsyncThunk<RestaurantState>('restaurant/fetchInfo', async () => {
    try {
      const response = await fetch(URL_RESTAURANT_DETAILS)
      if (!response.ok) {
        throw new Error('Failed to fetch restaurant information')
      }
      const responseItem = await response.json()
      const data: RestaurantState = responseItem[0]
      return data
    } catch (error) {
      return restaurantInfo[0] as unknown as RestaurantState
    }
  })

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantInfo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchRestaurantInfo.fulfilled,
        (state, action: PayloadAction<RestaurantState>) => {
          state.status = 'succeeded'
          state.data = action.payload
        },
      )
      .addCase(fetchRestaurantInfo.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong'
      })
  },
})

export default restaurantSlice.reducer
export type { StateRestaurantSlice as RestaurantState }
