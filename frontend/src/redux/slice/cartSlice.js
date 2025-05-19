import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizedAxios";

export const addToCart = createAsyncThunk("cart/addToCart", async (data) => {
  const response = await authorizedAxiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/create`, data);

  return response.data;
});

export const fetchCart = createAsyncThunk("cart/fetchCart", async ({ userId }) => {
  const response = await authorizedAxiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart/get`, { userId });

  return response.data;
});

export const updateCart = createAsyncThunk("cart/updateCart", async (data) => {
  const response = await authorizedAxiosInstance.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart/update`, data);

  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export const cartReducer = cartSlice.reducer;
