import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cart, CartResponse } from "../../types/types";

export const fetchCartByUserId = createAsyncThunk<Cart, number>(
  "cart/fetchCartByUserId",
  async (userId) => {
    const response = await axios.get<CartResponse>(
      `https://dummyjson.com/carts/user/${userId}`
    );
    return response.data.carts[0];
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
