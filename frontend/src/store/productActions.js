import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
var url = "http://localhost:5000/api/";

//Async request handling
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get(`${url}product`);
    return response;
  }
);
