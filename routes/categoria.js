const express = require("express");
const router = express.Router();
const CategoriaController = require("../controller/CategoriaController");
// Rotas para produtos
router.get("", (req, res) => {
  CategoriaController.getAll(req, res);
});
router.delete("/:id", (req, res) => {
  CategoriaController.delete(req, res);
});
router.get("/:id", (req, res) => {
  CategoriaController.getById(req, res);
});
router.put("/:id", (req, res) => {
  CategoriaController.update(req, res);
});
router.post("", (req, res) => {
  CategoriaController.insert(req, res);
});

module.exports = router;
