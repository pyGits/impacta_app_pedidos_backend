const Connection = require("./Connection");

class CategoriaRepository {
  async getAll() {
    return await Connection.select("select * from categoria");
  }
  async getById(id) {
    return await Connection.selectOne("select * from categoria where id = ?", [
      id,
    ]);
  }
  async insert(categoria) {
    return await Connection.insert("insert into categoria (nome) values (?)", [
      categoria.nome,
    ]);
  }
  async update(categoria) {
    return await Connection.update(
      "update categoria set nome = ? where id = ?",
      [categoria.nome, categoria.id]
    );
  }
  async delete(id) {
    return await Connection.delete("delete from categoria where id = ?", [id]);
  }
}

module.exports = new CategoriaRepository();
