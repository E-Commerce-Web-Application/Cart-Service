require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");


connectDB();

const PORT = process.env.REST_PORT;


app.listen(PORT, () => {
  console.log(`Cart Service running on port ${PORT}`);
});