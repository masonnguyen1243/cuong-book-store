import jwt from "jsonwebtoken";
import { ENV } from "../config/enviroment.js";

export const generateAccessToken = (id, role) => {
  try {
    const accessToken = jwt.sign({ id, role }, ENV.JWT_ACCESS_TOKEN, {
      expiresIn: ENV.JWT_ACCESS_TOKEN_EXPIRED,
    });

    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (id, role) => {
  try {
    const refreshToken = jwt.sign({ id, role }, ENV.JWT_REFRESH_TOKEN, {
      expiresIn: ENV.JWT_REFRESH_TOKEN_EXPIRED,
    });

    return refreshToken;
  } catch (error) {
    console.log(error);
  }
};
