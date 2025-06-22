import express, { Application } from "express";
import { booksRoutes } from "./app/controller/books.controller";
import { borrowRoutes } from "./app/controller/borrow.controller";

const app: Application = express();

app.use(express.json());

app.use("/books", booksRoutes);
app.use('/borrow', borrowRoutes)

app.get("/", (req, res) => {
  res.send({appRunning: true, message: "App run successfully!!!!!"});
});

export default app;
