import express from "express";
import { bookControllers } from "../controllers/bookControllers.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, isAdmin, bookControllers.createBook);

router.put("/update/:id", verifyToken, isAdmin, bookControllers.updateBook);

router.delete("/delete/:id", verifyToken, isAdmin, bookControllers.deleteBook);

router.get("/all", bookControllers.getAllBooks);

router.get("/new-arrivals", bookControllers.getNewArrivalsBook);

router.get("/best-sellers", bookControllers.getBestSellersBook);

router.get("/:id", bookControllers.getAnBook);

export default router;
