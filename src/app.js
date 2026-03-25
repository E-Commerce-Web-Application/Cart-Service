const express = require("express");
const cors = require("cors");
const cartRoutes = require("./routes/cartRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/cart", cartRoutes);

app.use(errorMiddleware);

module.exports = app;