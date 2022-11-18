import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/cart/cart_slice'

export default configureStore({
  reducer: {
    cart: counterReducer,
  },
})