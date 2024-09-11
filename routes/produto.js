const express = require("express");
const router = express.Router();
const ProdutoController = require("../controller/ProdutoController");
// Rotas para produtos
router.get("", (req, res) => {
  ProdutoController.getAll(req, res);
});
router.delete("/:id", (req, res) => {
  ProdutoController.delete(req, res);
});
router.get("/:id", (req, res) => {
  ProdutoController.getById(req, res);
});
router.put("/:id", (req, res) => {
  ProdutoController.updateProduto(req, res);
});
router.post("", (req, res) => {
  ProdutoController.createProduto(req, res);
});

module.exports = router;
