import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizedAxios";

export const createCheckout = createAsyncThunk("checkout/createCheckout", async (data) => {
  const response = await authorizedAxiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/create`, data);

  return response.data;
});

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCheckout.fulfilled, (state, action) => {
      state.checkout = action.payload;
    });
  },
});

export const checkoutReducer = checkoutSlice.reducer;
