import { createSlice } from '@reduxjs/toolkit'

const value = JSON.parse(localStorage.getItem('cart')) || [];

export const cart_slice = createSlice({
  name: 'cart',
  initialState: {
    value: value,
  },
  reducers: {
    add_to_cart: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = [...state.value, action.payload]
      localStorage.setItem("cart", JSON.stringify(state.value))
    },
    remove_from_cart: (state, action) => {
      state.value.splice(action.payload, 1)
      localStorage.setItem("cart", JSON.stringify(state.value))
    },
  },
})

// Action creators are generated for each case reducer function
export const { add_to_cart, remove_from_cart } = cart_slice.actions
export const selectCount = (state) => state.cart.value

export default cart_slice.reducer