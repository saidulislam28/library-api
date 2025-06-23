"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../model/books.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post("/", async (req, res) => {
    try {
        const body = req.body;
        const findBook = await books_model_1.Book.findById(body.book);
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
        }
        else {
            await findBook.save();
        }
        const borrowBook = await books_model_1.Borrow.create(body);
        return res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowBook,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error,
        });
    }
});
exports.borrowRoutes.get("/", async (req, res) => {
    try {
        const sendBorrowedBooks = await books_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error,
        });
    }
});
