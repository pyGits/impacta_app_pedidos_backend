const Connection = require("./Connection");
class TenantRepository {
  async get(TENANT_ID) {
    return await Connection.selectOne(
      "select email,nome from tenant where id = ?",
      [TENANT_ID]
    );
  }
  async getByEmail(email) {
    return await Connection.selectOne("select * from tenant where email = ?", [
      email,
    ]);
  }

  async updatePassword(email, password) {
    const params = [password, email];
    return await Connection.update(
      "update Tenant set senha = ? where email = ?",
      params
    );
  }

  async insert(tenant) {
    const params = [tenant.nome, tenant.email, tenant.senha];
    return await Connection.insert(
      "insert into Tenant (nome,email,senha) values (?,?,?)",
      params
    );
  }
}
module.exports = new TenantRepository();
