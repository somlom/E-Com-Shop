import cartReducer from './features/cart/cart_slice'
import counterReducer from './features/cart/same_slice'
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

import thunk from "redux-thunk";

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
    data: counterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
    })
    .concat(thunk),
})
export const persistor = persistStore(store)