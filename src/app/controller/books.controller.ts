import express from "express";
import { z } from "zod";
import { Book } from "../model/books.model";

export const booksRoutes = express.Router();

const booksZodSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  isbn: z.string(),
  description: z.string(),
  copies: z.number(),
  available: z.boolean(),
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
  const query: any = req.query;
  try {
    console.log(query);
    const books = await Book.find({ genre: { $eq: query.filter } })
      .sort({ createdAt: query.sort })
      .limit(query.limit);
    res.status(200).json({
      success: true,
      message: "Successfully fetched",
      data: books,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid request,  nothing is found",
      error: error,
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

booksRoutes.patch("/:id", async (req, res) => {
  // const body = req.body;
  try {
    const body = await booksZodSchema.parseAsync(req.body);
    const id = req.params.id;
    const updatedBook = await Book.findOneAndUpdate({ _id: id }, body, {
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
      message: "Invalid values",
      error: error,
    });
  }
});

booksRoutes.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete(id);

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

// const createNotesZodSchema = z.object({
//   title: z.string(),
//   email: z.string(),
//   content: z.string(),
//   category: z.string().optional(),
//   pinned: z.boolean(),
//   user_id: z.string(),
// });

// const userZodSchema = z.object({
//   name: z.string(),
//   email: z.string(),
//   password: z.string(),
// });

// notesRoutes.post("/create-user", async (req, res) => {
//   try {
//     const body = await userZodSchema.parseAsync(req.body);

//     // const password = await bcrypt.hash(body.password, 10);
//     // body.password = password;
//     // console.log(password)

//     // const user = new User(body);
//     // // const password = await user.hashPassword(body.password);
//     // // user.password = password;

//     // // console.log(password);
//     // // // console.log(body);

//     // // await user.save();

//     const user = await User.create(body);

//     // const user = await User.create(body);
//     res.status(201).json({
//       success: true,
//       message: "User created Successfully",
//       user,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//       error,
//     });
//   }
// });
// notesRoutes.post("/create-note", async (req, res) => {
//   try {
//     const body = await createNotesZodSchema.parseAsync(req.body);
//     const note = await Note.create(body);
//     res.status(201).json({
//       success: true,
//       message: "Note created Successfully",
//       note,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//       error,
//     });
//   }
// });

// notesRoutes.get("/", async (req, res) => {
//   const notes = await Note.find().populate("user_id", { name: 1 });
//   res.status(201).json({
//     success: true,
//     message: "Note created Successfully",
//     notes,
//   });
// });
// notesRoutes.get("/user", async (req, res) => {
//   const user = await User.find();
//   res.status(201).json({
//     success: true,
//     message: "Note created Successfully",
//     user,
//   });
// });

// notesRoutes.get("/get-one/:id", async (req, res) => {
//   const { id } = req.params;

//   const notes = await Note.findById(id);

//   res.status(201).json({
//     success: true,
//     message: "Note created Successfully",
//     notes,
//   });
// });
// notesRoutes.patch("/update-one/:id", async (req, res) => {
//   const { id } = req.params;
//   const body = req.body;

//   const notes = await Note.findByIdAndUpdate(id, body, { new: true });

//   res.status(201).json({
//     success: true,
//     message: "Note created Successfully",
//     notes,
//   });
// });
// notesRoutes.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;

//   const notes = await Note.findByIdAndDelete(id);

//   res.status(201).json({
//     success: true,
//     message: "Note created Successfully",
//     notes,
//   });
// });
// notesRoutes.delete("/user/:id", async (req, res) => {
//   const { id } = req.params;

//   const notes = await User.findOneAndDelete({ _id: id });

//   res.status(201).json({
//     success: true,
//     message: "Note created Successfully",
//     notes,
//   });
// });
