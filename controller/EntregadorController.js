const EntregadorRepository = require("../repository/EntregadorRepository");

class EntregadorController {
  async getAll(req, res) {
    const response = await EntregadorRepository.getAll(req.TENANT_ID);
    res.status(200).json(response);
  }
  async getById(req, res) {
    const response = await EntregadorRepository.getById(
      req.params.id,
      req.TENANT_ID
    );
    res.status(200).json(response);
  }
  async insert(req, res) {
    const response = await EntregadorRepository.insert(req.body, req.TENANT_ID);
    res.status(201).json({
      message: "Entregador inserido com sucesso!",
      data: response.insertId,
    });
  }
  async update(req, res) {
    await EntregadorRepository.update(req.body, req.TENANT_ID);
    res.status(200).json({
      message: "Entregador atualizado com sucesso!",
      data: req.body.id,
    });
  }
  async delete(req, res) {
    await EntregadorRepository.delete(req.params.id, req.TENANT_ID);
    res.status(201).json({ message: "Entregador deletado com sucesso!" });
  }
}
module.exports = new EntregadorController();
