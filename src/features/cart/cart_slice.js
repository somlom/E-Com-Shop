import { createSlice } from '@reduxjs/toolkit'


export const cart_slice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    quantity: 0,
    status: null,
  },
  reducers: {
    set_to_cart: (state, action) => {

      const itemInCart = state.cart.find((item) => item.product === action.payload._id)

      if (itemInCart) {

        if (action.payload.quantity === undefined) {

          state.quantity++
          itemInCart.quantity++

        } else {

          if (itemInCart.quantity > action.payload.quantity) {
            state.quantity -= (parseInt(itemInCart.quantity) - parseInt(action.payload.quantity))
          } else if (itemInCart.quantity < action.payload.quantity) {
            state.quantity += (parseInt(action.payload.quantity) - parseInt(itemInCart.quantity))
          } else {
            state.quantity = parseInt(action.payload.quantity)
          }
          itemInCart.quantity = action.payload.quantity

        };
      } else {

        state.cart.push({ product: action.payload._id, quantity: 1 });
        state.quantity++;

      }
    },
    remove_from_cart: (state, action) => {

      const removeItem = state.cart.filter((item) => item.product !== action.payload._id);
      state.cart = removeItem;
      state.quantity -= parseInt(removeItem.quantity)

    },
    remove_one_from_cart: (state, action) => {

      const item = state.cart.find((item) => item.product === action.payload._id);

      if (item.quantity === 1) {

        const removeItem = state.cart.filter((item) => item.product !== action.payload.product);
        state.cart = removeItem;
        state.quantity--;

      } else {

        item.quantity--;
        state.quantity--;
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_to_cart, remove_from_cart, remove_one_from_cart } = cart_slice.actions
export const selectCount = (state) => state.cart.quantity
export const cartArray = (state) => state.cart.cart

export default cart_slice.reducer