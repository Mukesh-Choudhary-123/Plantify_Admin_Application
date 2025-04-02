import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  admin: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { admin, token } = action.payload;
      state.isAuthenticated = true;
      state.admin = admin;
      state.token = token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } =
  authSlice.actions;

export default authSlice.reducer;
