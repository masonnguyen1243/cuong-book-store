import UserModel from "../models/userModel.js";
import StatusCode from "http-status-codes";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middlewares/jwt.js";
import ms from "ms";
import SendEmail from "../utils/sendEmail.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if ((!name, !email, !password)) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Fields are required!" });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(StatusCode.NOT_ACCEPTABLE)
        .json({ success: false, message: "User is already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      verifyToken: uuidv4(),
    });

    if (password.length < 8) {
      return res.status(StatusCode.NOT_ACCEPTABLE).json({
        success: false,
        message:
          "Password must include at least 1 letter, a number, and at least 8 characters.",
      });
    }

    await newUser.save();

    //Send Email
    const verificationLink = `http://localhost:5173/account/verification?email=${newUser.email}&token=${newUser.verifyToken}`;
    const customSubject = "Please verify your email before using our service";
    const htmlContent = `
      <h3>Here is your verification link</h3>
      <h3>${verificationLink}</h3>
      <h3>Sincerely, <br/> - Book 101 - </h3>
    `;

    await SendEmail(newUser.email, customSubject, htmlContent);

    return res.status(StatusCode.CREATED).json({
      success: true,
      message: "Registration successfully! Please check your email!",
    });
  } catch (error) {
    console.error("Error in register controllers");

    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Fields are required!" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "User not found" });
    }

    if (!user.isActive) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Your account is not verify, Please check your email",
      });
    }

    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      return res
        .status(StatusCode.CONFLICT)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ms("7 days"),
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(StatusCode.OK).json({
      success: true,
      message: "Logged in successfully",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Error in login controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res
      .status(StatusCode.OK)
      .json({ success: true, message: "Logged out successfully!" });
  } catch (error) {
    console.error("Error in logout controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const verifyAccount = async (req, res) => {
  try {
    const { email, token } = req.body;
    if ((!email, !token)) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Fields are required!" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "User not found!" });
    }

    if (user.isActive) {
      return res.status(StatusCode.CONFLICT).json({
        success: false,
        message: "Your account is already active! Please login",
      });
    }

    if (token !== user.verifyToken) {
      return res
        .status(StatusCode.NOT_ACCEPTABLE)
        .json({ success: false, message: "Invalid Token!" });
    }

    user.isActive = true;
    user.verifyToken = null;

    await user.save();

    return res.status(StatusCode.OK).json({
      success: true,
      message: "Verification successfully! Please login to enjoy our website!",
    });
  } catch (error) {
    console.error("Error in verifyAccount controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const authControllers = { register, login, logout, verifyAccount };
