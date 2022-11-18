import { createSlice } from '@reduxjs/toolkit'

export const cart_slice = createSlice({
  name: 'cart',
  initialState: {
    value: 0,
  },
  reducers: {
    add_to_cart: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    remove_from_cart: (state) => {
      state.value -= 1
    },
    add_many_to_cart: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { add_to_cart, remove_from_cart, add_many_to_cart } = cart_slice.actions
export const selectCount = (state) => state.cart.value

export default cart_slice.reducer