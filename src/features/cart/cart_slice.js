import { createSlice } from '@reduxjs/toolkit'


export const cart_slice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    status: null,
  },
  reducers: {
    set_to_cart: (state, action) => {
      const itemInCart = state.cart.find((item) => item._id === action.payload._id)
      if (itemInCart) {
        action.payload.quantity === undefined ? itemInCart.quantity += 1 : itemInCart.quantity = action.payload.quantity;
      } else {
        state.cart.push({ _id: action.payload._id, quantity: 1 });
      }
    },
    remove_from_cart: (state, action) => {

      const removeItem = state.cart.filter((item) => item._id !== action.payload._id);
      state.cart = removeItem;

    },
    remove_one_from_cart: (state, action) => {

      const item = state.cart.find((item) => item._id === action.payload._id);
      if (item.quantity === 1) {
        const removeItem = state.cart.filter((item) => item._id !== action.payload._id);
        state.cart = removeItem;
      } else {
        item.quantity--;
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_to_cart, remove_from_cart, remove_one_from_cart } = cart_slice.actions
export const selectCount = (state) => state.cart

export default cart_slice.reducer