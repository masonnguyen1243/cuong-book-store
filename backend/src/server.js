import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/enviroment.js";
import { connectDB } from "./config/db.js";
import { initRoutes } from "./routes/index.js";

const app = express();

const PORT = ENV.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    methods: "GET, PUT, DELETE, POST",
  })
);

connectDB();

initRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
