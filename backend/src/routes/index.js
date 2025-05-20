import authRoutes from "./authRoutes.js";
import bookRoutes from "./bookRoutes.js";
import cartRoutes from "./cartRoutes.js";
import checkoutRoutes from "./checkoutRoutes.js";
import orderRoutes from "./orderRoutes.js";

export const initRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/book", bookRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/checkout", checkoutRoutes);
  app.use("/api/order", orderRoutes);
};
