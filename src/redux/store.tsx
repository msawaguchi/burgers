import { configureStore } from '@reduxjs/toolkit'
import restaurantReducer, { RestaurantState } from './restaurantSlice'
import menuReducer, { MenuState } from './menuSlice'
import cartReducer, { CartState } from './cartSlice'
import searchReducer, { SearchState } from './searchSlice'

export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    menu: menuReducer,
    cart: cartReducer,
    search: searchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type { RestaurantState, MenuState, CartState, SearchState }
