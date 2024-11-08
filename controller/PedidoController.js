const PedidoRepository = require("../repository/PedidoRepository");

class PedidoController {
  async getAll(req, res) {
    try {
      const response = await PedidoRepository.getAll(req.TENANT_ID);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar pedidos" });
    }
  }

  async getById(req, res) {
    try {
      const response = await PedidoRepository.getById(
        req.params.id,
        req.TENANT_ID
      );
      if (!response) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar pedido" });
    }
  }

  async createPedido(req, res) {
    try {
      await PedidoRepository.insert(req.body, req.TENANT_ID);
      res.status(201).json({ message: "Pedido criado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao criar pedido" });
    }
  }

  async delete(req, res) {
    try {
      await PedidoRepository.delete(req.params.id, req.TENANT_ID);
      res.status(200).json({ message: "Pedido deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar pedido" });
    }
  }
}

module.exports = new PedidoController();
