import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cart } from "../../types/types";

export const fetchCartByUserId = createAsyncThunk<Cart>(
  "cart/fetchCartByUserId",
  async () => {
    const response = await axios.get("https://dummyjson.com/carts/user/6");
    return response.data.carts[0] as Cart;
  }
);

interface CartState {
  cart: Cart | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: CartState = {
  cart: null,
  loading: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartByUserId.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCartByUserId.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchCartByUserId.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export default cartSlice.reducer;
