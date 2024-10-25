const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGO_URI || "mongodb://localhost:27017/restaurantDB";

mongoose
  .connect(URI)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.error("DB connection error:", err));

module.exports = mongoose;
