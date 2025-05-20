import OrderModel from "../models/orderModel.js";
import StatusCode from "http-status-codes";

const getUserOrder = async (req, res) => {
  try {
    const { id } = req.user;

    const order = await OrderModel.find({ user: id }).sort({
      createdAt: -1,
    });

    if (!order) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Order not found" });
    }

    return res.status(StatusCode.OK).json({ success: true, data: order });
  } catch (error) {
    console.error("Error in getUserOrder controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const getUserOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id).populate("user", "name email");

    if (!order) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Order not found" });
    }

    return res.status(StatusCode.OK).json({ success: true, data: order });
  } catch (error) {
    console.error("Error in getUserOrderDetails controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const orderControllers = { getUserOrder, getUserOrderDetails };
