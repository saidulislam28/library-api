import express from "express";
import { Book, Borrow } from "../model/books.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req, res) => {
  try {
    const body = req.body;
    const findBook: any = await Book.findById(body.book);

    if (!findBook || findBook.available === false) {
      return res.status(400).json({
        message: "Book is not available",
      });
    }

    if (findBook.copies < body.quantity) {
      return res.status(400).json({
        message: "Not enough copies available",
      });
    }

    findBook.copies -= body.quantity;

    if (findBook.copies <= 0) {
      await findBook.updateAvailabilityFalse();
    } else {
      await findBook.save();
    }

    const borrowBook = await Borrow.create(body);

    return res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error,
    });
  }
});

borrowRoutes.get("/", async (req, res) => {
  try {
    const sendBorrowedBooks = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,

          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: sendBorrowedBooks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error,
    });
  }
});
