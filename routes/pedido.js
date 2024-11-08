const express = require("express");
const router = express.Router();
const PedidoController = require("../controller/PedidoController");
const authenticateToken = require("../middleware/authenticateToken"); // Importa o middleware

router.get("/", authenticateToken, (req, res) => {
  PedidoController.getAll(req, res);
});
router.delete("/:id", authenticateToken, (req, res) => {
  PedidoController.delete(req, res);
});

router.get("/:id", authenticateToken, (req, res) => {
  PedidoController.getById(req, res);
});

router.post("/:tenant_id", (req, res) => {
  req.TENANT_ID = req.params.tenant_id;
  PedidoController.createPedido(req, res);
});

module.exports = router;
