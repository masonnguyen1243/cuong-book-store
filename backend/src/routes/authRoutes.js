import express from "express";
import { authControllers } from "../controllers/authControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", authControllers.register);

router.post("/login", authControllers.login);

router.delete("/logout", verifyToken, authControllers.logout);

router.put("/verify-account", authControllers.verifyAccount);

export default router;
