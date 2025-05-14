import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/enviroment.js";
import { connectDB } from "./config/db.js";

const app = express();

const PORT = ENV.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", (req, res) => {
  res.send("Hello world!");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
