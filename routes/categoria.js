const express = require("express");
const router = express.Router();
const CategoriaController = require("../controller/CategoriaController");
const authenticateToken = require("../middleware/authenticateToken");
// Rotas para produtos
router.get("", authenticateToken, (req, res) => {
  CategoriaController.getAll(req, res);
});
router.delete("/:id", authenticateToken, (req, res) => {
  CategoriaController.delete(req, res);
});
router.get("/:id", authenticateToken, (req, res) => {
  CategoriaController.getById(req, res);
});
router.put("/:id", authenticateToken, (req, res) => {
  CategoriaController.update(req, res);
});
router.post("", authenticateToken, (req, res) => {
  CategoriaController.insert(req, res);
});

module.exports = router;
