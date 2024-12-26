const express = require("express");
const path = require("path");
const mongoose = require("./db"); // Importa tu configuración de MongoDB
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/order.routes"); // Importar rutas de pedidos

const app = express();
const port = process.env.PORT || 5000;

// Configurar CORS para permitir solicitudes desde tu dominio de GitHub Pages
const corsOptions = {
  origin: "https://Chucho2278.github.io", // Reemplaza 'tu-usuario' con tu nombre de usuario de GitHub
  optionsSuccessStatus: 200, // Para hacer compatible con navegadores más antiguos
};

app.use(cors(corsOptions));
app.use(express.json());

// Servir archivos estáticos de Angular
app.use(express.static(path.join(__dirname, "dist/restaurant-ecommerce")));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api", orderRoutes);

// Añadir la ruta de prueba para verificar la conexión a MongoDB
app.get("/test-db-connection", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).send("MongoDB connection is successful!");
  } catch (error) {
    res.status(500).send("MongoDB connection error: " + error.message);
  }
});

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
