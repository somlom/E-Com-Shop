import { createSlice } from '@reduxjs/toolkit'


export const cart_slice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    add_to_cart: (state, action) => {
      const itemInCart = state.cart.find((item) => item._id === action.payload)
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ _id: action.payload, quantity: 1 });
      }
    },
    remove_from_cart: (state, action) => {

      const removeItem = state.cart.filter((item) => item._id !== action.payload);
      state.cart = removeItem;

    },
    remove_one_from_cart: (state, action) => {

      const item = state.cart.find((item) => item._id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { add_to_cart, remove_from_cart, remove_one_from_cart } = cart_slice.actions
export const selectCount = (state) => state.cart

export default cart_slice.reducer