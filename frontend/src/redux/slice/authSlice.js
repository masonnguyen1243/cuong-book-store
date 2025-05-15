import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizedAxios";

export const register = createAsyncThunk("auth/register", async (data) => {});
