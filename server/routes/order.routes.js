const express = require("express");
const router = express.Router();
const Order = require("../models/order"); // Asegúrate de ajustar la ruta según la ubicación de tu modelo

// Crear un nuevo pedido
router.post("/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener un pedido por ID
router.get("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send();
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Obtener todos los pedidos (opcional, para administración)
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
