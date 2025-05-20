import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ENV } from "../config/enviroment.js";

export const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(accessToken, ENV.JWT_ACCESS_TOKEN);

    req.user = decoded;

    next();
  } catch (error) {
    if (error?.message?.includes("jwt expired")) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Token expired" });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: "REQUIRE ADMIN ROLE!" });
  }
};
