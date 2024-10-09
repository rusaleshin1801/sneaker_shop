import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, Quantity, QuantitiesState } from "../../types/types";

const initialState: QuantitiesState = {
  quantities: [],
};

const quantitiesSlice = createSlice({
  name: "quantities",
  initialState,
  reducers: {
    setQuantities(state, action: PayloadAction<Quantity[]>) {
      state.quantities = action.payload;
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const product = state.quantities.find((item) => item.id === id);
      if (product) {
        const unitPrice = product.totalPrice / product.quantity;
        const newTotalPrice = unitPrice * quantity;

        const discountPercentage =
          (product.discountedPrice / (unitPrice * product.quantity)) * 100;
        const newDiscountedPrice = parseFloat(
          (newTotalPrice - newTotalPrice * (discountPercentage / 100)).toFixed(
            2
          )
        );

        product.quantity = quantity;
        product.totalPrice = newTotalPrice;
        product.discountedPrice = newDiscountedPrice;
      }
    },
    addProduct(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingProduct = state.quantities.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice = product.price * existingProduct.quantity;
        existingProduct.discountedPrice = parseFloat(
          (
            existingProduct.totalPrice -
            existingProduct.totalPrice * (product.discountPercentage / 100)
          ).toFixed(2)
        );
      } else {
        const newProduct: Quantity = {
          id: product.id,
          quantity: 1,
          totalPrice: product.price,
          discountedPrice: parseFloat(
            (
              product.price -
              product.price * (product.discountPercentage / 100)
            ).toFixed(2)
          ),
        };
        state.quantities.push(newProduct);
      }
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.quantities = state.quantities.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { setQuantities, updateQuantity, addProduct, removeProduct } =
  quantitiesSlice.actions;
export default quantitiesSlice.reducer;
