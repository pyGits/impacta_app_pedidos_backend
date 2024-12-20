const express = require("express");
const router = express.Router();
const TenantController = require("../controller/TenantController");
const ProdutoController = require("../controller/ProdutoController");
const ClienteController = require("../controller/ClienteController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/:tenant_id/produto", (req, res) => {
  req.TENANT_ID = req.params.tenant_id;
  ProdutoController.getAll(req, res);
});
router.get("/:tenant_id/cliente", (req, res) => {
  req.TENANT_ID = req.params.tenant_id;
  ClienteController.getAll(req, res);
});

router.get("", authenticateToken, (req, res) => {
  TenantController.get(req, res);
});
router.post("", (req, res) => {
  TenantController.create(req, res);
});
router.post("/login", (req, res) => {
  TenantController.login(req, res);
});
router.post("/newPassword", (req, res) => {
  TenantController.newPassword(req, res);
});

module.exports = router;
