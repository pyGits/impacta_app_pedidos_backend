const express = require("express");
const router = express.Router();

const produtos_router = require("./produto");
const images_router = require("./image");
const categorias_router = require("./categoria");

router.use("/produto", produtos_router);
router.use("/", images_router);
router.use("/categoria", categorias_router);

module.exports = router;
