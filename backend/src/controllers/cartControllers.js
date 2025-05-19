import CartModel from "../models/cartModel.js";
import BookModel from "../models/bookModel.js";
import StatusCode from "http-status-codes";

const createCart = async (req, res) => {
  try {
    const { bookId, quantity, userId } = req.body;
    const book = await BookModel.findById(bookId);
    if (!book) {
      return res
        .status(StatusCode)
        .json({ success: false, message: "Book not found" });
    }

    let cart = await CartModel.findOne({ user: userId });
    if (cart) {
      const bookIndex = cart.books.findIndex(
        (book) => book.bookId.toString() === bookId
      );

      if (bookIndex > -1) {
        cart.books[bookIndex].quantity += quantity;
      } else {
        cart.books.push({
          bookId,
          name: book.name,
          image: book.image,
          price: book.price,
          discountPrice: book.discountPrice,
          quantity,
        });
      }

      // Cập nhật totalPrice dựa trên discountPrice nếu có, ngược lại dùng price
      cart.totalPrice = cart.books.reduce((acc, item) => {
        const itemPrice =
          item.discountPrice !== null ? item.discountPrice : item.price;
        return acc + itemPrice * item.quantity;
      }, 0);

      // if (book.discountPrice !== null) {
      //   cart.totalPrice = cart.books.reduce(
      //     (acc, item) => acc + item.discountPrice * item.quantity,
      //     0
      //   );
      // } else {
      //   cart.totalPrice = cart.books.reduce(
      //     (acc, item) => acc + item.price * item.quantity,
      //     0
      //   );
      // }

      const updatedCart = await cart.save();
      return res
        .status(StatusCode.CREATED)
        .json({ success: true, data: updatedCart });
    } else {
      const itemPrice =
        book.discountPrice !== null ? book.discountPrice : book.price;

      const newCart = await CartModel.create({
        user: userId ? userId : undefined,
        books: [
          {
            bookId,
            name: book.name,
            image: book.image,
            price: book.price,
            discountPrice: book.discountPrice,
            quantity,
          },
        ],
        totalPrice: itemPrice * quantity, // Sử dụng discountPrice nếu có
      });

      return res
        .status(StatusCode.CREATED)
        .json({ success: true, data: newCart });
    }
  } catch (error) {
    console.error("Error in createCart controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { bookId, quantity, userId } = req.body;
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Cart not found" });
    }
    const bookIndex = cart.books.findIndex(
      (book) => book.bookId.toString() === bookId
    );

    if (bookIndex > -1) {
      if (quantity > 0) {
        cart.books[bookIndex].quantity = quantity;
      } else {
        cart.books.splice(bookIndex, 1);
      }

      cart.totalPrice = cart.books.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const updatedCart = await cart.save();
      return res
        .status(StatusCode.OK)
        .json({ success: true, data: updatedCart });
    } else {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Book not found in cart" });
    }
  } catch (error) {
    console.error("Error in updateCart controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    let cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Cart not found" });
    }
    const bookIndex = cart.books.findIndex(
      (book) => book.bookId.toString() === bookId
    );

    if (bookIndex > -1) {
      cart.books.splice(bookIndex, 1);

      cart.totalPrice = cart.books.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "Deleted successfully!" });
    } else {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Book not found in cart" });
    }
  } catch (error) {
    console.error("Error in deleteCart controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const getCartDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);

    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Cart not found" });
    }

    return res.status(StatusCode.OK).json({ success: true, data: cart });
  } catch (error) {
    console.error("Error in getCartDetails controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const cartControllers = {
  createCart,
  updateCart,
  deleteCart,
  getCartDetails,
};
