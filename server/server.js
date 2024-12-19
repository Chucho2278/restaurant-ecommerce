const express = require("express");
const path = require("path");
const mongoose = require("./db"); // Importará tu configuración de MongoDB
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/order.routes"); // Importar rutas de pedidos

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos de Angular
app.use(express.static(path.join(__dirname, "dist/restaurant-ecommerce")));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api", orderRoutes);

// Manejar todas las demás rutas y devolver el archivo index.html de Angular
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/restaurant-ecommerce/index.html"));
});

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
