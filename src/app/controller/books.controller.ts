import express from "express";
import { z } from "zod";
import { Book } from "../model/books.model";

export const booksRoutes = express.Router();

const booksZodSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  genre: z.string().optional(),
  isbn: z.string().optional(),
  description: z.string().optional(),
  copies: z.number().optional(),
  available: z.boolean().optional(),
});

booksRoutes.post("/", async (req, res) => {
  try {
    // const body = req.body;
    const body = await booksZodSchema.parseAsync(req.body);
    const book = await Book.create(body);
    res.status(200).json({
      success: true,
      message: "Book Created Successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation Failed",
      error: error,
    });
  }
});

booksRoutes.get("/", async (req, res) => {
  try {
    const { filter, sortBy, sort, limit = 10 }: any = req.query;
    const query: any = {};
    if (filter) {
      query.genre = filter;
    }
    let booksQuery = Book.find(query);
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

booksRoutes.get("/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;
    // console.log(bookId);
    const book = await Book.findById(bookId).select("-__v");

    res.status(200).json({
      success: true,
      message: "Get book Successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "No book found by this id",
      error: error,
    });
  }
});

booksRoutes.put("/:bookId", async (req, res) => {
  // const body = req.body;
  try {
    const body = await booksZodSchema.parseAsync(req.body);
    const bookId = req.params.bookId;
    const updatedBook = await Book.findOneAndUpdate({ _id: bookId }, body, {
      returnOriginal: false,
    }).select("-__v");
    res.status(200).json({
      success: true,
      message: "Book updated Successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid values for update",
      error: error,
    });
  }
});

booksRoutes.delete("/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);

    res.status(200).json({
      success: true,
      message: "Book deleted Successfully",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "No data found, Delete Failed",
      error: error,
    });
  }
});
