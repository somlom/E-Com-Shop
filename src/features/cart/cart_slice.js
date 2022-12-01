import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { usePostData } from '../../hooks/Data';


const form_local_storage = JSON.parse(localStorage.getItem('cart')) || [];

export const cart_slice = createSlice({
  name: 'cart',
  initialState: {
    value: form_local_storage,
  },
  reducers: {
    set_redux: (state, action) => {
      state.value = action.payload
    }
    ,
    add_to_cart: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (state.value.find(item => item._id === action.payload)) {

        const res = state.value.find(item => item._id === action.payload)
        res.count += 1;
        state.value[state.value.indexOf(res)] = res;
        localStorage.setItem("cart", JSON.stringify(state.value))

      } else {

        state.value.push({ _id: action.payload, count: 1 })
        localStorage.setItem("cart", JSON.stringify(state.value))

      }
    },
    remove_from_cart: (state, action) => {

      state.value.splice(state.value.find(item => item._id === action.payload), 1)
      localStorage.setItem("cart", JSON.stringify(state.value))

    },
    remove_one_from_cart: (state, action) => {

      const res = state.value.find(item => item._id === action.payload)

      res.count -= 1;

      if (res.count === 0) {

        state.value.splice(state.value.indexOf(res), 1)
      }

      state.value[state.value.indexOf(res)] = res;

      localStorage.setItem("cart", JSON.stringify(state.value))
    },
    edit_item_count: (state, action) => {

      const res = state.value.find(item => item.id === action.payload.id);
      res.count = action.payload.count;

      state.value[state.value.indexOf(res)] = res;
      localStorage.setItem("cart", JSON.stringify(state.value))
    }
  },
})

// Action creators are generated for each case reducer function
export const { set_redux, add_to_cart, remove_from_cart, remove_one_from_cart, edit_item_count } = cart_slice.actions
export const selectCount = (state) => state.cart.value

export default cart_slice.reducer