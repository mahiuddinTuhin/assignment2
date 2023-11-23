import mongoose from "mongoose";
import app from "./app";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const port = process.env.PORT || 5050;
const db_url = process.env.DB_URL || "";
const db_name = process.env.DB_NAME || "assignment2";
// main().catch((err) => console.log(err));

async function main() {
  try {
    const connection = await mongoose.connect(`${db_url}/
    ${db_name}`);
    if (connection) {
      app.listen(port, () => {
        console.log("databse connected.");
        console.log(`Server is up on port: ${port}`);
      });
    }
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

main();
