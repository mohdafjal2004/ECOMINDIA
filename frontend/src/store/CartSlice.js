import { createSlice } from "@reduxjs/toolkit";
import { addProduct } from "./cartActions";
import { getCartProducts } from "./cartActions";
import { deleteCartProducts } from "./cartActions";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: true,
    error: null,
    num: 0,
    success: false,
  },
  // reducers: {
  //   addToCart(state, action) {
  //     state.cart.push = action.payload;
  //   },
  //   removeFromCart(state, action) {
  //      state.cart.filter((item) => item.id !== action.payload.id);
  //   },
  // },

  extraReducers: (builder) => {
    //* Extra Reducers for Adding Product in cart
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.push = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Extra Reducers for Getting cart product

      .addCase(getCartProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Extra Reducers for deleting cart products
      .addCase(deleteCartProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;
      })
      .addCase(deleteCartProducts.rejected, (state) => {
        state.loading = false;
        state.success = false;
      });
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
