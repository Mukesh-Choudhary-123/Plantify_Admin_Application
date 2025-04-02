import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import { authApi } from '../api/auth'
import authReducer from './slice/authSlice'
import {sellerApi} from '../api/seller'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [sellerApi.reducerPath]: sellerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      sellerApi.middleware,
    ),
});

setupListeners(store.dispatch);
