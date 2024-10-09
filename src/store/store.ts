import { configureStore } from "@reduxjs/toolkit";
import { getProductApi } from "./slices/getProductApi";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import quantitiesReducer from "./slices/quantitiesSlice";
import cartDataReducer from "./slices/cartDataSlice";

const middleware = [getProductApi.middleware];

const store = configureStore({
  reducer: {
    [getProductApi.reducerPath]: getProductApi.reducer,
    cart: cartReducer,
    user: userReducer,
    quantities: quantitiesReducer,
    cartData: cartDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
