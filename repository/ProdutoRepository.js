const Connection = require("./Connection");
class ProdutoRepository {
  async getAll() {
    return await Connection.select("select * from produto order by id asc");
  }
  async delete(id) {
    return await Connection.delete("delete from produto where id = ?", [id]);
  }

  async insert(produto) {
    const params = [
      produto.nome,
      produto.preco_venda,
      produto.imagem,
      produto.categoria_id,
      0,
    ];
    await Connection.insert(
      "insert into produto (nome,preco_venda,imagem,categoria_id,tenant_id) values (?,?,?,?,?)",
      params
    );
  }
  async update(produto) {
    const params = [
      produto.nome,
      produto.preco_venda,
      produto.imagem,
      produto.categoria_id,
      produto.id,
    ];

    await Connection.update(
      "update produto set nome = ?,preco_venda=?,imagem=?,categoria_id=? where id = ?",
      params
    );
  }
  async getById(id) {
    let produto = await Connection.selectOne(
      "select * from produto where id = ?",
      [id]
    );

    return produto;
  }
}
module.exports = new ProdutoRepository();
