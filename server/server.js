const express = require("express");
const mongoose = require("./db"); // Esto importará tu configuración de MongoDB
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/order.routes"); // Importar rutas de pedidos

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api", orderRoutes);

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
