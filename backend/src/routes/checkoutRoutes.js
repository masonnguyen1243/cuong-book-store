import express from "express";
import { CheckoutControllers } from "../controllers/checkoutControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, CheckoutControllers.createCheckout);

router.put("/:id/pay", verifyToken, CheckoutControllers.updateCheckout);

router.post("/:id/finalize", verifyToken, CheckoutControllers.finalizeCheckout);

export default router;
