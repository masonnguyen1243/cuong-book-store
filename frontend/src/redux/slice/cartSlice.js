import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizedAxios";

export const addToCart = createAsyncThunk("cart/addToCart", async (data) => {
  const response = await authorizedAxiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/create`, data);

  return response.data;
});

export const fetchCart = createAsyncThunk("cart/fetchCart", async ({ userId }) => {
  const response = await authorizedAxiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart/get`, {
    params: { userId },
  });

  return response.data;
});

export const updateCart = createAsyncThunk("cart/updateCart", async (data) => {
  const response = await authorizedAxiosInstance.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart/update`, data);

  return response.data;
});

export const deleteCart = createAsyncThunk("cart/deleteCart", async (data) => {
  const response = await authorizedAxiosInstance.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/delete`, {
    data: data,
  });

  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = null;
    },
  },
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
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export const { clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
