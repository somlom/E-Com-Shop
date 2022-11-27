import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';

const value = JSON.parse(localStorage.getItem('cart')) || [];

// const count = useSelector()

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
      if (state.value.find(item => item.id === action.payload.id)) {

        const res = state.value.find(item => item.id === action.payload.id)
        res.count += 1;
        state.value[state.value.indexOf(res)] = res;
        localStorage.setItem("cart", JSON.stringify(state.value))

      } else {

        state.value = [...state.value, { ...action.payload, count: 1 }]
        localStorage.setItem("cart", JSON.stringify(state.value))

      }
    },
    remove_from_cart: (state, action) => {
      state.value.splice(state.value.find(item => item.id === action.payload.id), 1)
      localStorage.setItem("cart", JSON.stringify(state.value))
    },
    remove_one_from_cart: (state, action) => {
      const res = state.value.find(item => item.id === action.payload.id)
      res.count -= 1;
      state.value[state.value.indexOf(res)] = res;
      if (res.count === 0) {
        state.value.splice(action.payload, 1)
      }
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
export const { add_to_cart, remove_from_cart, remove_one_from_cart, edit_item_count } = cart_slice.actions
export const selectCount = (state) => state.cart.value

export default cart_slice.reducer