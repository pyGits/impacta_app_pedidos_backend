const PedidoRepository = require("../repository/PedidoRepository");
const ClienteRepository = require("../repository/ClienteRepository");
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

      response.cliente = await ClienteRepository.getById(
        response.cliente_id,
        req.TENANT_ID
      );

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar pedido", error });
    }
  }

  async createPedido(req, res) {
    try {
      const pedido = req.body;
      const isClienteExists = await ClienteRepository.getByCelular(
        pedido.cliente.celular,
        req.TENANT_ID
      );

      if (!isClienteExists) {
        const inserted = await ClienteRepository.insert(
          pedido.cliente,
          req.TENANT_ID
        );
        pedido.cliente_id = inserted.insertId;
      }
      if (isClienteExists) {
        pedido.cliente_id = isClienteExists.id;
      }

      await PedidoRepository.insert(pedido, req.TENANT_ID);
      res.status(201).json({ message: "Pedido criado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao criar pedido :" + error });
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
  async update(req, res) {
    try {
      await PedidoRepository.update(req.body, req.TENANT_ID);
      res.status(200).json({ message: "Pedido atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar pedido" });
    }
  }
  async getByCelular(req, res) {
    try {
      const { tenant_id, celular } = req.params;
      const cliente = await ClienteRepository.getByCelular(celular, tenant_id);
      const response = await PedidoRepository.getByCliente(
        tenant_id,
        cliente.id
      );
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = new PedidoController();
