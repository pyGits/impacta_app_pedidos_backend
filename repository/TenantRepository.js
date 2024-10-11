const Connection = require("./Connection");
class TenantRepository {
  async get(email) {
    return await Connection.selectOne("select * from tenant where email = ?", [
      email,
    ]);
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
