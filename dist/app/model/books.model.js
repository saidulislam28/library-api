"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
    timestamps: true,
});
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number },
    dueDate: { type: String },
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.methods.updateAvailabilityFalse = async function () {
    this.available = false;
    this.copies = 0;
    return this.save();
};
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
