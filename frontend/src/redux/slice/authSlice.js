import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizedAxios";

export const registerUser = createAsyncThunk("auth/register", async (data) => {
  const response = await authorizedAxiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, data);

  return response.data;
});

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  const response = await authorizedAxiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, data);

  return response.data;
});

export const verifyAccount = createAsyncThunk("auth/verifyAccount", async (data) => {
  const response = await authorizedAxiosInstance.put(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-account`,
    data,
  );

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const user = action.payload;
      state.user = user;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const user = action.payload;
      state.user = user;
    });
    builder.addCase(verifyAccount.fulfilled, (state, action) => {
      const user = action.payload;
      state.user = user;
    });
  },
});

export const authReducer = authSlice.reducer;
