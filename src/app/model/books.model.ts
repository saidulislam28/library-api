import { model, Schema } from "mongoose";
import { Books } from "../interface/interface";

const bookSchema = new Schema<Books>(
  {
    title: { type: String, required: [true, "This is required Field"] },
    author: { type: String, required: true },
    genre: { type: String },
    isbn: { type: String },
    description: { type: String },
    copies: {
      type: Number,
      required: [true, "Copies must be a positive number"],
    },
    available: { type: Boolean, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const borrowSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number },
    dueDate: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
bookSchema.methods.updateAvailabilityFalse = async function () {
  this.available = false;
  this.copies = 0;
  return this.save();
};
export const Book = model("Book", bookSchema);
export const Borrow = model("Borrow", borrowSchema);
