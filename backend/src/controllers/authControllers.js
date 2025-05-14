import UserModel from "../models/userModel.js";
import StatusCode from "http-status-codes";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

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
        .json({ success: false, message: "User not found" });
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

    return res.status(StatusCode.CREATED).json({
      success: true,
      message: "Registration successfully!",
      data: newUser,
    });
  } catch (error) {
    console.error("Error in register controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const authControllers = { register };
