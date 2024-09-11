const ProdutoRepository = require("../repository/ProdutoRepository");

class ProdutoController {
  async getAll(req, res) {
    const response = await ProdutoRepository.getAll();
    res.status(200).json(response);
  }
  async delete(req, res) {
    await ProdutoRepository.delete(req.params.id);
    res.status(201).json({ message: "Produto deletado com sucesso !" });
  }
  async createProduto(req, res) {
    await ProdutoRepository.insert(req.body);
    res.status(201).json({ message: "Produto inserido com sucesso !" });
  }
  async updateProduto(req, res) {
    await ProdutoRepository.update(req.body);
    res.status(200).json({ message: "Produto Atualizado com sucesso !" });
  }
  async getById(req, res) {
    const response = await ProdutoRepository.getById(req.params.id);
    res.status(200).json(response);
  }
}
module.exports = new ProdutoController();
