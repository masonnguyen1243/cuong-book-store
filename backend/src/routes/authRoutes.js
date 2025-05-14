import express from "express";
import { authControllers } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", authControllers.register);

router.post("/login", authControllers.login);

router.delete("/logout", authControllers.logout);

router.put("/verify-account", authControllers.verifyAccount);

export default router;
