const express = require("express");
const router = express.Router();
const ClienteController = require("../controller/ClienteController");
const authenticateToken = require("../middleware/authenticateToken"); // Importa o middleware

// Rotas de cliente com autenticação
router.get("", authenticateToken, (req, res) => {
  ClienteController.getAll(req, res);
});

router.delete("/:id", authenticateToken, (req, res) => {
  ClienteController.delete(req, res);
});

router.get("/:id", authenticateToken, (req, res) => {
  ClienteController.getById(req, res);
});
router.get("/:celular/:tenant/celular", (req, res) => {
  ClienteController.getByCelular(req, res);
});

router.put("/:id", authenticateToken, (req, res) => {
  ClienteController.updateCliente(req, res);
});

router.post("", authenticateToken, (req, res) => {
  ClienteController.createCliente(req, res);
});

module.exports = router;
