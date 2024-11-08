const express = require("express");
const router = express.Router();

const produtos_router = require("./produto");
const images_router = require("./image");
const categorias_router = require("./categoria");
const clientes_router = require("./cliente");
const tenants_router = require("./tenant");
const pedido_router = require("./pedido");

router.use("/tenant", tenants_router);
router.use("/pedido", pedido_router);
router.use("/produto", produtos_router);
router.use("/", images_router);
router.use("/categoria", categorias_router);
router.use("/cliente", clientes_router);

module.exports = router;
