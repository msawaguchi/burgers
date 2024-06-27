import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk,
} from '@reduxjs/toolkit'
import menuItems from '../resources/menu.json'
import { MenuState, StateMenuSlice } from '../lib/definitions'

const initialState: StateMenuSlice = {
  data: null,
  status: 'idle',
  error: null,
}

const URL_MENU = 'https://cdn-dev.preoday.com/challenge/menu'

export const fetchMenuInfo: AsyncThunk<MenuState, void, object> =
  createAsyncThunk<MenuState>('menu/fetchInfo', async () => {
    try {
      const response = await fetch(URL_MENU)
      if (!response.ok) {
        throw new Error(
          'Failed to fetch menu information, using local resources.',
        )
      }

      const data: MenuState = await response.json()
      return data
    } catch (error) {
      return menuItems[0] as unknown as MenuState
    }
  })

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuInfo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchMenuInfo.fulfilled,
        (state, action: PayloadAction<MenuState>) => {
          state.status = 'succeeded'
          state.data = action.payload
        },
      )
      .addCase(fetchMenuInfo.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong'
      })
  },
})

export default menuSlice.reducer
export type { StateMenuSlice as MenuState }
