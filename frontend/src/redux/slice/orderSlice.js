import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizedAxios";

export const getUserOrders = createAsyncThunk("order/getUserOrders", async () => {
  const response = await authorizedAxiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/api/order/my-orders`);

  return response.data;
});

export const getUserOrderDetails = createAsyncThunk("order/getUserOrderDetails", async (id) => {
  const response = await authorizedAxiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/api/order/${id}`);

  return response.data;
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: null,
    orderDetails: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(getUserOrderDetails.fulfilled, (state, action) => {
      state.orderDetails = action.payload;
    });
  },
});

export const orderReducer = orderSlice.reducer;
