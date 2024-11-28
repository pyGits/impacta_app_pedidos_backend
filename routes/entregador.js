const express = require("express");
const router = express.Router();
const EntregadorController = require("../controller/EntregadorController");
const authenticateToken = require("../middleware/authenticateToken");

// Rotas para entregador
router.get("", authenticateToken, (req, res) => {
  EntregadorController.getAll(req, res);
});
router.delete("/:id", authenticateToken, (req, res) => {
  EntregadorController.delete(req, res);
});
router.get("/:id", authenticateToken, (req, res) => {
  EntregadorController.getById(req, res);
});
router.put("/:id", authenticateToken, (req, res) => {
  EntregadorController.update(req, res);
});
router.post("", authenticateToken, (req, res) => {
  EntregadorController.insert(req, res);
});

module.exports = router;
