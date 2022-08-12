import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
var url = "https://ecomindbackend.herokuapp.com/api/";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}user/signup`, {
        name,
        email,
        password,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}user/signin`, {
        email,
        password,
      }, );
    
      //store token in local storage
      if (response.data) {
        localStorage.setItem("usertoken", JSON.stringify(response.data.authTokensingin));
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
