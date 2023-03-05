import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';


export const cart_slice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    update_cart: (state, action) => {
      state.cart = action.payload
    },
    set_to_cart: (state, action) => {

      const itemInCart = state.cart.find((item) => item._id === action.payload.id)

      if (itemInCart) {

        if (action.payload.quantity === undefined) {

          itemInCart.quantity++
          toast.success("Successfuly added!")

        } else {

          itemInCart.quantity = action.payload.quantity

        }
      } else {

        state.cart.push({ _id: action.payload.id, quantity: 1 });
        toast.success("Successfuly added!")

      }
    },
    remove_from_cart: (state, action) => {

      const removeItem = state.cart.filter((item) => item._id !== action.payload.id);
      state.cart = removeItem;

    },
    remove_one_from_cart: (state, action) => {

      const item = state.cart.find((item) => item._id === action.payload.id);

      if (item.quantity === 1) {

        const removeItem = state.cart.filter((item) => item._id !== action.payload.id);
        state.cart = removeItem;

      } else {

        item.quantity--;

      }
    },
  },
})

export const { set_to_cart, remove_from_cart, remove_one_from_cart, update_cart } = cart_slice.actions
export const cartArray = (state) => state.cart.cart

export default cart_slice.reducer