const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const authenticateToken = require("../middleware/authenticateToken"); // Importa o middleware

const uploadsPath = path.resolve(__dirname, "../uploads");
const ImageController = require("./../controller/ImageController");

// Configuração do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

// Servir a pasta de uploads como estática
router.use("/upload", express.static(uploadsPath));

// Rotas de imagem com autenticação
router.post(
  "/image/upload",
  authenticateToken,
  upload.single("image"),
  (req, res) => {
    ImageController.insert(req, res);
  }
);

router.get("/image", authenticateToken, (req, res) => {
  ImageController.getAll(req, res);
});

module.exports = router;
