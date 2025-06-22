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

// borrowSchema.post("validate", function (doc) {
//   console.log("%s has been validated (but not saved yet)", doc);
// });
// borrowSchema.post("validate", async function (doc: any) {
//   const findBook: any = await Book.findOne({ _id: doc.book });
//   if (findBook?.copies <= 0) {
//     const updateBook = await Book.findOneAndUpdate({
//       _id: doc.book,
//       available: false,
//     });
//     return updateBook;
//   }
//   // console.log("hitting 2");
// });

bookSchema.methods.updateAvailabilityFalse = async function () {
  this.available = false;
  this.copies = 0;
  return this.save();
};
export const Book = model("Book", bookSchema);
export const Borrow = model("Borrow", borrowSchema);

// import { Model, model, Schema } from "mongoose";
// import { IUser, UserInstanceMethods } from "../interface/interface";
// import bcrypt from "bcryptjs";

// const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods>(
//   {
//     name: { type: String },
//     email: {
//       type: String,
//     },
//     password: { type: String },
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );

// const noteSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     email: {
//       type: String,
//       required: true,
//       minLength: [5, "Min of length 5"],
//       validate: {
//         validator: function (value: any) {
//           return true;
//         },
//         message: function (props: any) {
//           return `email ${props.value} is not a email`;
//         },
//       },
//     },
//     content: { type: String, default: "" },
//     category: { type: String, enum: ["Personal", "Public"], default: "Public" },
//     pinned: { type: Boolean, default: false },
//     user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//   }
// );

// userSchema.method("hashPassword", async function (pass: string) {
//   const password = await bcrypt.hash(pass, 10);
//   return password;
// });

// userSchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 10);
//   console.log(this);
// });

// userSchema.post("findOneAndDelete", async function (doc) {
//   console.log("doc", doc);
//   await Note.deleteMany({ user_id: doc._id });
// });

// userSchema.virtual("full_name").get(function(){
//   return `${this.email} ${this.name}`
// })

// export const Note = model("Note", noteSchema);
// export const User = model("User", userSchema);
