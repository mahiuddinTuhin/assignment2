"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const port = process.env.PORT || 5050;
const db_url = process.env.DB_URL || "";
main().catch((err) => console.log(err));
async function main() {
    const connected = await mongoose_1.default.connect(`${db_url}/
  assignment2`);
    if (connected) {
        console.log("databse connected.");
    }
}
app_1.default.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});
