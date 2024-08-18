import { configureStore } from "@reduxjs/toolkit";
import { getProductApi } from "./slices/getProductApi";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    [getProductApi.reducerPath]: getProductApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getProductApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
