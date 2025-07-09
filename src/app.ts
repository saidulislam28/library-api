import express, { Application } from "express";
import cors from "cors";
import { booksRoutes } from "./app/controller/books.controller";
import { borrowRoutes } from "./app/controller/borrow.controller";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req, res) => {
  res.send({ appRunning: true, message: "App run successfully!!!!!" });
});
app.get("/api", (req, res) => {
  res.send({ appRunning: true, message: "App run successfully!!!!!" });
});


export default app;
