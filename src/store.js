import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import cartReducer from './features/cart/cart_slice'
import { cart_api } from './features/cart/cart_api';


const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, cartReducer)
// export const store = configureStore({
//   reducer: {
//     persistedReducer,
//     [cartApi.reducerPath]: cartApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(cartApi.middleware),
// })
// export const persistor = persistStore(store)

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    [cart_api.reducerPath]: cart_api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(cart_api.middleware)
})
export const persistor = persistStore(store)
