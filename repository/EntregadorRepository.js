// repository/EntregadorRepository.js
const Connection = require("./Connection");

class EntregadorRepository {
  async getAll(TENANT_ID) {
    return await Connection.select(
      "select * from entregador where tenant_id = ? order by id asc",
      [TENANT_ID]
    );
  }

  async delete(id, TENANT_ID) {
    return await Connection.delete(
      "delete from entregador where id = ? and tenant_id = ?",
      [id, TENANT_ID]
    );
  }

  async insert(entregador, TENANT_ID) {
    const params = [entregador.nome, entregador.telefone, TENANT_ID];
    return await Connection.insert(
      "insert into entregador (nome, telefone, tenant_id) values (?, ?, ?)",
      params
    );
  }

  async update(entregador, TENANT_ID) {
    const params = [
      entregador.nome,
      entregador.telefone,
      entregador.id,
      TENANT_ID,
    ];

    await Connection.update(
      "update entregador set nome = ?, telefone = ? where id = ? and tenant_id = ?",
      params
    );
  }

  async getById(id, TENANT_ID) {
    let entregador = await Connection.selectOne(
      "select * from entregador where id = ? and tenant_id = ?",
      [id, TENANT_ID]
    );

    return entregador;
  }
}

module.exports = new EntregadorRepository();
