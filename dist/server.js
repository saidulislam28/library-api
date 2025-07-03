"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
let server;
const port = process.env.PORT || 8000;
async function main() {
    try {
        await mongoose_1.default.connect("mongodb+srv://saidulislams9028:rp6idvjsAZjfqFlv@cluster0.a1ptd7f.mongodb.net/library");
        console.log("connected with mongodb mongoose");
        server = app_1.default.listen(port, () => {
            console.log(`app is listening on port ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
