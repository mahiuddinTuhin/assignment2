import mongoose from "mongoose";
import app from "./app";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const port = process.env.PORT || 5050;
const db_url = process.env.DB_URL || "";
main().catch((err) => console.log(err));

async function main() {
  const connected = await mongoose.connect(`${db_url}/
  assignment2`);

  if (connected) {
    console.log("databse connected.");
  }
}

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
