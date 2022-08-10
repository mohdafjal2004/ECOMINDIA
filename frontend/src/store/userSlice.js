import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./userActions";
import { loginUser } from "./userActions";

//Getting token from localStorage
const users = localStorage.getItem("usertoken");

const initialState = {
  loading: false,
  users: [],
  userToken: users ? users : null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  //* ExtraReducers for handling userRegister
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //* ExtraReducers for handling LoginUser
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.userToken = action.payload.userToken;
      state.success = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
