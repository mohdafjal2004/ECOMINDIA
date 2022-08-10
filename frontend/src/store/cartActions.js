import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
var url = "http://localhost:5000/api/";

//Add product in cart in backend
export const addProduct = createAsyncThunk(
  "cart/addProduct",
  async ({ productId, count }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}cart/addproductincart`,
        {
          productId,
          count,
        },
        {
          //remember headers should always be in third parameter
          headers: {
            "auth-token": JSON.parse(localStorage.getItem("usertoken")),
          },
        }
      );
      console.log(response.data, "Cart Action");

      return response;
    } catch (error) {
      console.log(rejectWithValue(error));
    }
  }
);

//Get product from cart
export const getCartProducts = createAsyncThunk(
  "cart/getproducts",
  async () => {
    try {
      const response = await axios.get(`${url}cart/getcartproduct`, {
        headers: {
          "auth-token": JSON.parse(localStorage.getItem("usertoken")),
        },
      });

      // console.log(response.data.length);
      return response;
    } catch (error) {
      console.log("Server Error");
    }
  }
);

//Deleting the cart products
export const deleteCartProducts = createAsyncThunk(
  "cart/deleteProducts",
  //remember we are destructuring id here becoz we are not sending it as a  payload but in URL
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}cart/deleteCartProduct/_${id}`,
        {
          headers: {
            "auth-token": JSON.parse(localStorage.getItem("usertoken")),
          }, 
        }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Server Error", error);
    }
  }
);
