const express = require("express");
const router = express.Router();
const ProdutoController = require("../controller/ProdutoController");
const authenticateToken = require("../middleware/authenticateToken"); // Importa o middleware

// Rotas para produtos
router.get("", authenticateToken, (req, res) => {
  ProdutoController.getAll(req, res);
});

router.delete("/:id", authenticateToken, (req, res) => {
  ProdutoController.delete(req, res);
});

router.get("/:id", authenticateToken, (req, res) => {
  ProdutoController.getById(req, res);
});

router.put("/:id", authenticateToken, (req, res) => {
  ProdutoController.updateProduto(req, res);
});

router.post("", authenticateToken, (req, res) => {
  ProdutoController.createProduto(req, res);
});

module.exports = router;
