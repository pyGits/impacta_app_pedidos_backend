const Connection = require("./Connection");
class ProdutoRepository {
  async getAll(TENANT_ID) {
    return await Connection.select(
      "select * from produto where tenant_id = ?  order by id asc",
      [TENANT_ID]
    );
  }
  async delete(id, TENANT_ID) {
    return await Connection.delete(
      "delete from produto where id = ? and tenant_id = ?",
      [id, TENANT_ID]
    );
  }

  async insert(produto, TENANT_ID) {
    const params = [
      produto.nome,
      produto.preco_venda,
      produto.imagem,
      produto.categoria_id,
      TENANT_ID,
    ];
    await Connection.insert(
      "insert into produto (nome,preco_venda,imagem,categoria_id,tenant_id) values (?,?,?,?,?)",
      params
    );
  }
  async update(produto, TENANT_ID) {
    const params = [
      produto.nome,
      produto.preco_venda,
      produto.imagem,
      produto.categoria_id,
      produto.id,
      TENANT_ID,
    ];

    await Connection.update(
      "update produto set nome = ?,preco_venda=?,imagem=?,categoria_id=? where id = ? and tenant_id=?",
      params
    );
  }
  async getById(id, TENANT_ID) {
    let produto = await Connection.selectOne(
      "select * from produto where id = ? and tenant_id= ?",
      [id, TENANT_ID]
    );

    return produto;
  }
}
module.exports = new ProdutoRepository();
