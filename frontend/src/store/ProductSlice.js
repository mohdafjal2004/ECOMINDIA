import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productActions";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: " loading",
});


//Slicing the state
const ProductSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {},
  //for all products
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = STATUSES.LOADING;
    },
    [fetchProducts.fulfilled]: (state, { payload }) => {
      state.status = STATUSES.IDLE;
      state.data = payload;
    },
    [fetchProducts.rejected]: (state) => {
      state.status = STATUSES.ERROR;
    },
  },
});
export default ProductSlice.reducer;
