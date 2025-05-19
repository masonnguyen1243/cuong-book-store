import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizedAxios";

export const getNewArrivals = createAsyncThunk("book/getNewArrivals", async () => {
  const response = await authorizedAxiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/api/book/new-arrivals`);

  return response.data;
});

export const getBestSellers = createAsyncThunk("book/getBestSellers", async () => {
  const response = await authorizedAxiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/api/book/best-sellers`);

  return response.data;
});

export const getAllBooks = createAsyncThunk("book/getAllsBook", async () => {
  const response = await authorizedAxiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/api/book/all`);

  return response.data;
});

export const getCurrentBook = createAsyncThunk("book/getCurrentBook", async ({ id }) => {
  const response = await authorizedAxiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/api/book/${id}`);

  return response.data;
});

const bookSlice = createSlice({
  name: "book",
  initialState: {
    newArrivals: null,
    bestSellers: null,
    books: null,
    currentBook: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewArrivals.fulfilled, (state, action) => {
      state.newArrivals = action.payload;
    });
    builder.addCase(getBestSellers.fulfilled, (state, action) => {
      state.bestSellers = action.payload;
    });
    builder.addCase(getAllBooks.fulfilled, (state, action) => {
      state.books = action.payload;
    });
    builder.addCase(getCurrentBook.fulfilled, (state, action) => {
      state.currentBook = action.payload;
    });
  },
});

export const bookReducer = bookSlice.reducer;
