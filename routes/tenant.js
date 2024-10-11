const express = require("express");
const router = express.Router();
const TenantController = require("../controller/TenantController");

router.post("", (req, res) => {
  TenantController.create(req, res);
});
router.post("/login", (req, res) => {
  TenantController.login(req, res);
});

module.exports = router;
