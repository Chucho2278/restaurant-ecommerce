const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Añadir marcas de tiempo de creación y actualización
  }
);

module.exports = mongoose.model("User", userSchema);
