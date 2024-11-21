const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String }, // Solo si es domicilio
    deliveryTime: { type: String }, // Solo si es domicilio
    pickupTime: { type: String }, // Solo si es recogida en restaurante
    email: { type: String, required: true },
    paymentMethod: { type: String, required: true }, // "efectivo" o "online"
    items: [
      {
        product: {
          name: { type: String, required: true },
          price: { type: Number, required: true },
        },
        quantity: { type: Number, required: true },
      },
    ], // Lista de productos en el pedido
  },
  {
    timestamps: true, // Añadir marcas de tiempo de creación y actualización
  }
);

module.exports = mongoose.model("Order", orderSchema);
