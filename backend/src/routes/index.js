import authRoutes from "./authRoutes.js";
import bookRoutes from "./bookRoutes.js";
import cartRoutes from "./cartRoutes.js";

export const initRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/book", bookRoutes);
  app.use("/api/cart", cartRoutes);
};
