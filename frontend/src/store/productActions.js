import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
var url = "https://ecomindbackend.herokuapp.com/api/";

//Async request handling
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get(`${url}product`);
    return response;
  }
);
