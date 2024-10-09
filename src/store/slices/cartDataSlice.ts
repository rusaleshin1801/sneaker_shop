import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartDataState } from "../../types/types";

const initialState: { cartData: CartDataState | null } = {
  cartData: null,
};

const cartDataSlice = createSlice({
  name: "cartData",
  initialState,
  reducers: {
    setCartData(state, action: PayloadAction<CartDataState>) {
      state.cartData = action.payload;
    },
    clearCartData(state) {
      state.cartData = null;
    },
  },
});

export const { setCartData, clearCartData } = cartDataSlice.actions;
export default cartDataSlice.reducer;
