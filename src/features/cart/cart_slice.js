import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const set_to_cart = createAsyncThunk(
  "cart/set_to_cart", async (id = null, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:4000/products/cart", { data: cart })
      return res?.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const cart_slice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    status: null,
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
  extraReducers: {
    [set_to_cart.pending]: (state, action) => state.status = "pending",
    [set_to_cart.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.items = action.payload
    },
    [set_to_cart.rejected]: (state, action) => state.status = "rejected",
  }
  // https://redux-toolkit.js.org/api/createSlice#the-extrareducers-builder-callback-notation
  // https://redux-toolkit.js.org/api/createAction
})

// Action creators are generated for each case reducer function
export const { add_to_cart, remove_from_cart, remove_one_from_cart } = cart_slice.actions
export const selectCount = (state) => state.cart

export default cart_slice.reducer