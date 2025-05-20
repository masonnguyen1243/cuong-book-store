import express from "express";
import { orderControllers } from "../controllers/orderControllers.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/my-orders", verifyToken, orderControllers.getUserOrder);

router.get("/:id", verifyToken, orderControllers.getUserOrderDetails);

export default router;
