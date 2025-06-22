import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
let server: Server;
const port = 8000;
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://saidulislams9028:rp6idvjsAZjfqFlv@cluster0.a1ptd7f.mongodb.net/library"
    );
    console.log("connected with mongodb mongoose");
    server = app.listen(port, () => {
      console.log(`app is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
