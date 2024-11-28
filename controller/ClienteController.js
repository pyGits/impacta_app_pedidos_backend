const ClienteRepository = require("../repository/ClienteRepository");

class ClienteController {
  async getAll(req, res) {
    const response = await ClienteRepository.getAll(req.TENANT_ID);
    res.status(200).json(response);
  }

  async delete(req, res) {
    await ClienteRepository.delete(req.params.id, req.TENANT_ID);
    res.status(201).json({ message: "Cliente deletado com sucesso!" });
  }

  async createCliente(req, res) {
    await ClienteRepository.insert(req.body, req.TENANT_ID);
    res.status(201).json({ message: "Cliente inserido com sucesso!" });
  }

  async updateCliente(req, res) {
    await ClienteRepository.update(req.body, req.TENANT_ID);
    res.status(200).json({ message: "Cliente atualizado com sucesso!" });
  }
  async getByCelular(req, res) {
    const response = await ClienteRepository.getByCelular(
      req.params.celular,
      req.params.tenant
    );
    res.status(200).json(response);
  }
  async getById(req, res) {
    const response = await ClienteRepository.getById(
      req.params.id,
      req.TENANT_ID
    );
    res.status(200).json(response);
  }
}

module.exports = new ClienteController();
