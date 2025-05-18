import StatusCode from "http-status-codes";
import BookModel from "../models/bookModel.js";

const createBook = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      tags,
      image,
      rating,
      views,
    } = req.body;

    const book = new BookModel({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      tags,
      image,
      rating,
      views,
      user: req.user.id,
    });

    await book.save();

    return res.status(StatusCode.CREATED).json({
      success: true,
      message: "Created successfully!",
      data: book,
    });
  } catch (error) {
    console.error("Error in createBook controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      tags,
      image,
      rating,
      views,
    } = req.body;

    const { id } = req.params;

    const book = await BookModel.findById(id);

    if (book) {
      book.name = name || book.name;
      book.description = description || book.description;
      book.price = price || book.price;
      book.discountPrice = discountPrice || book.discountPrice;
      book.countInStock = countInStock || book.countInStock;
      book.category = category || book.category;
      book.image = image || book.image;
      book.tags = tags || book.tags;
      book.rating = rating || book.rating;
      book.views = views || book.views;
    } else {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Book not found" });
    }

    const updatedBook = await book.save();

    return res.status(StatusCode.OK).json({
      success: true,
      message: "Updated successfully!",
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error in updateBook controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await BookModel.findByIdAndDelete(id);

    if (!book) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Book not found" });
    }

    return res
      .status(StatusCode.OK)
      .json({ success: true, message: "Deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteBook controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find({});
    if (!books) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Books not found" });
    }

    return res.status(StatusCode.OK).json({ success: true, data: books });
  } catch (error) {
    console.error("Error in getAllBooks controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const getAnBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await BookModel.findById(id);

    if (!book) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Book not found" });
    }

    return res.status(StatusCode.OK).json({ success: true, data: book });
  } catch (error) {
    console.error("Error in getAnBook controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const getNewArrivalsBook = async (req, res) => {
  try {
    const book = await BookModel.find().sort({ createdAt: -1 }).limit(1);

    if (!book) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Book not found" });
    }

    return res.status(StatusCode.OK).json({ success: true, data: book });
  } catch (error) {
    console.error("Error in getNewArrivalsBook controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const getBestSellersBook = async (req, res) => {
  try {
    const book = await BookModel.find().sort({ rating: -1 }).limit(4);

    if (!book) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Book not found" });
    }

    return res.status(StatusCode.OK).json({ success: true, data: book });
  } catch (error) {
    console.error("Error in getBestSellersBook controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

const getSimilarBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    if (!book) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "Book not found" });
    }

    const similarBook = await BookModel.find({
      _id: { $ne: id },
      category: book.category,
    }).limit(4);

    return res.status(StatusCode.OK).json({ success: true, data: similarBook });
  } catch (error) {
    console.error("Error in getSimilarBook controllers");
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const bookControllers = {
  createBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getAnBook,
  getNewArrivalsBook,
  getBestSellersBook,
  getSimilarBook,
};
