"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const books_model_1 = require("../model/books.model");
exports.booksRoutes = express_1.default.Router();
const booksZodSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    author: zod_1.z.string().optional(),
    genre: zod_1.z.string().optional(),
    isbn: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number().optional(),
    available: zod_1.z.boolean().optional(),
});
exports.booksRoutes.post("/", async (req, res) => {
    try {
        // const body = req.body;
        const body = await booksZodSchema.parseAsync(req.body);
        const book = await books_model_1.Book.create(body);
        res.status(200).json({
            success: true,
            message: "Book Created Successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation Failed",
            error: error,
        });
    }
});
exports.booksRoutes.get("/", async (req, res) => {
    try {
        const { filter, sortBy, sort, limit = 10 } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        let booksQuery = books_model_1.Book.find(query);
        if (sortBy && sort) {
            const sortOrder = sort === "asc" ? "asc" : "desc";
            booksQuery = booksQuery.sort({ [sortBy]: sortOrder });
        }
        if (limit) {
            booksQuery = booksQuery.limit(parseInt(limit));
        }
        const books = await booksQuery;
        res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});
exports.booksRoutes.get("/:bookId", async (req, res) => {
    try {
        const bookId = req.params.bookId;
        // console.log(bookId);
        const book = await books_model_1.Book.findById(bookId).select("-__v");
        res.status(200).json({
            success: true,
            message: "Get book Successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "No book found by this id",
            error: error,
        });
    }
});
exports.booksRoutes.patch("/:bookId", async (req, res) => {
    // const body = req.body;
    try {
        const body = await booksZodSchema.parseAsync(req.body);
        console.log("body", body);
        const bookId = req.params.bookId;
        const updatedBook = await books_model_1.Book.findOneAndUpdate({ _id: bookId }, body, {
            returnOriginal: false,
        }).select("-__v");
        res.status(200).json({
            success: true,
            message: "Book updated Successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid values for update",
            error: error,
        });
    }
});
exports.booksRoutes.delete("/:bookId", async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const book = await books_model_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted Successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "No data found, Delete Failed",
            error: error,
        });
    }
});
