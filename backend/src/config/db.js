import mongoose from "mongoose";
import { ENV } from "./enviroment.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Connection failed", error);
    process.exit(1);
  }
};
