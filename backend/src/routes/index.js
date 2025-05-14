import authRoutes from "./authRoutes.js";

export const initRoutes = (app) => {
  app.use("/api/auth", authRoutes);
};
