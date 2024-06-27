import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SearchState } from '../lib/definitions'

const initialState: SearchState = {
  searchTerm: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
  },
})

export const { setSearchTerm } = searchSlice.actions
export default searchSlice.reducer
export type { SearchState }
