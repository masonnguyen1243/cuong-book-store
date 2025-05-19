import express from "express";
import { cartControllers } from "../controllers/cartControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, cartControllers.createCart);

router.put("/update", verifyToken, cartControllers.updateCart);

router.delete("/delete", verifyToken, cartControllers.deleteCart);

router.get("/", verifyToken, cartControllers.getCartDetails);

export default router;
