import CheckoutModel from "../models/checkoutModel.js";
import StatusCode from "http-status-codes";
import OrderModel from "../models/orderModel.js";
import CartModel from "../models/cartModel.js";

const createCheckout = async (req, res) => {
  try {
    const { id } = req.user;

    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
      req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "No items in checkout" });
    }

    const newCheckout = await CheckoutModel.create({
      user: id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });

    return res
      .status(StatusCode.CREATED)
      .json({ success: true, data: newCheckout });
  } catch (error) {
    console.error("Error in createCheckout controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const updateCheckout = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, paymentDetails } = req.body;

    const checkout = await CheckoutModel.findById(id);
    if (!checkout) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Checkout not found" });
    }

    if (paymentStatus === "Paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();

      return res.status(StatusCode.OK).json({ success: true, data: checkout });
    } else {
      return res
        .status(StatusCode.NOT_ACCEPTABLE)
        .json({ success: false, message: "Invalid payment status" });
    }
  } catch (error) {
    console.error("Error in updateCheckout controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const finalizeCheckout = async (req, res) => {
  try {
    const { id } = req.params;
    const checkout = await CheckoutModel.findById(id);

    if (!checkout) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      const finalOrder = await OrderModel.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "Paid",
        paymentDetails: checkout.paymentDetails,
      });

      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();

      await checkout.save();

      await CartModel.findByIdAndDelete({ user: checkout.user });

      return res
        .status(StatusCode.OK)
        .json({ success: true, data: finalOrder });
    } else if (checkout.isFinalized) {
      return res
        .status(StatusCode.NOT_ACCEPTABLE)
        .json({ success: true, message: "Checkout already finalized" });
    } else {
      return res
        .status(StatusCode.NOT_ACCEPTABLE)
        .json({ message: "Checkout is not paid" });
    }
  } catch (error) {
    console.error("Error in finalizeCheckout controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const CheckoutControllers = {
  createCheckout,
  updateCheckout,
  finalizeCheckout,
};
