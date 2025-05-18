import authRoutes from "./authRoutes.js";
import bookRoutes from "./bookRoutes.js";

export const initRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/book", bookRoutes);
};
