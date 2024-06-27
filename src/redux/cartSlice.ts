import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartState } from '../lib/definitions'

const initialState: CartState = {
  items: [],
  totalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload
      const existingItem = state.items.find((i) => i.id === item.id)
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        state.items.push(item)
      }
      state.totalAmount += item.price * item.quantity
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      const id = action.payload
      const existingItem = state.items.find((item) => item.id === id)
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id)
        state.totalAmount -= existingItem.price * existingItem.quantity
      }
    },
    updateItemQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const { id, quantity } = action.payload
      const existingItem = state.items.find((item) => item.id === id)
      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity
        existingItem.quantity = quantity
        state.totalAmount += existingItem.price * quantity
      }
    },
  },
})

export const { addItemToCart, removeItemFromCart, updateItemQuantity } =
  cartSlice.actions

export default cartSlice.reducer
export type { CartState }
