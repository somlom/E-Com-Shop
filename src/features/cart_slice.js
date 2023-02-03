import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';


const get_count = (state) => {

  const cart = state.cart

  let arr = 0;

  if (cart.length !== 0) {

    cart.map(obj => arr += parseInt(obj.quantity))

  }
  
  state.quantity = arr
  
}
export const cart_slice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    quantity: 0,
  },
  reducers: {

    set_to_cart: (state, action) => {

      const itemInCart = state.cart.find((item) => item._id === action.payload.id)

      if (itemInCart) {

        if (action.payload.quantity === undefined) {

          itemInCart.quantity++
          get_count(state)

        } else {

          itemInCart.quantity = action.payload.quantity
          get_count(state)

        }
      } else {

        state.cart.push({ _id: action.payload.id, quantity: 1 });
        get_count(state)

      }
      toast.success("Successfuly added!")
    },
    remove_from_cart: (state, action) => {

      const removeItem = state.cart.filter((item) => item._id !== action.payload.id);
      state.cart = removeItem;
      get_count(state)

    },
    remove_one_from_cart: (state, action) => {

      const item = state.cart.find((item) => item._id === action.payload.id);

      if (item.quantity === 1) {

        const removeItem = state.cart.filter((item) => item._id !== action.payload.id);
        state.cart = removeItem;
        get_count(state)

      } else {

        item.quantity--;
        get_count(state)
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_to_cart, remove_from_cart, remove_one_from_cart } = cart_slice.actions
export const selectCount = (state) => state.cart.quantity
export const cartArray = (state) => state.cart.cart

export default cart_slice.reducer