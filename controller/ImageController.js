const ImageRepository = require("../repository/ImageRepository");

class ImageController {
  async getAll(req, res) {
    const response = await ImageRepository.getAll(req.TENANT_ID);
    res.status(200).json(response);
  }

  async insert(req, res) {
    if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado!" });
    }
    await ImageRepository.insert(req.file.filename, req.TENANT_ID);
    res
      .status(201)
      .json({ message: "Upload bem-sucedido", file: req.file.filename });
  }
}

module.exports = new ImageController();
