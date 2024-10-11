const CategoriaRepository = require("../repository/CategoriaRepository");

class CategoriaController {
  async getAll(req, res) {
    const response = await CategoriaRepository.getAll(req.TENANT_ID);
    res.status(200).json(response);
  }
  async getById(req, res) {
    const response = await CategoriaRepository.getById(
      req.params.id,
      req.TENANT_ID
    );
    res.status(200).json(response);
  }
  async insert(req, res) {
    const response = await CategoriaRepository.insert(req.body, req.TENANT_ID);
    res.status(201).json({
      message: "Categoria Inserida com sucesso !",
      data: response.insertId,
    });
  }
  async update(req, res) {
    await CategoriaRepository.update(req.body, req.TENANT_ID);
    res.status(200).json({
      message: "Categoria atualizada com sucesso !",
      data: req.body.id,
    });
  }
  async delete(req, res) {
    await CategoriaRepository.delete(req.params.id, req.TENANT_ID);
    res.status(201).json({ message: "Categoria deletada com sucesso !" });
  }
}
module.exports = new CategoriaController();
