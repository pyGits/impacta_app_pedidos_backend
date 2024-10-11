const Connection = require("./Connection");

class CategoriaRepository {
  async getAll(tenant) {
    return await Connection.select(
      "select * from categoria where tenant_id = ?",
      [tenant]
    );
  }
  async getById(id, tenant) {
    return await Connection.selectOne(
      "select * from categoria where id = ? and tenant_id = ?",
      [id, tenant]
    );
  }
  async insert(categoria, tenant) {
    return await Connection.insert(
      "insert into categoria (nome,tenant_id) values (?,?)",
      [categoria.nome, tenant]
    );
  }
  async update(categoria, tenant) {
    return await Connection.update(
      "update categoria set nome = ? where id = ? and tenant_id =?",
      [categoria.nome, categoria.id, tenant]
    );
  }
  async delete(id, tenant) {
    return await Connection.delete(
      "delete from categoria where id = ? and tenant_id = ?",
      [id, tenant]
    );
  }
}

module.exports = new CategoriaRepository();
