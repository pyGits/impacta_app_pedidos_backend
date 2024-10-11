const Connection = require("./Connection");
class ImageRepository {
  constructor() {
    this.connection = Connection;
  }
  async getAll(tenant) {
    return await Connection.select("select * from imagem WHERE TENANT_ID = ?", [
      tenant,
    ]);
  }

  async insert(image_name, tenant) {
    await Connection.insert(
      "insert into imagem (nome,tenant_id) values (?,?)",
      [image_name, tenant]
    );
  }
}

module.exports = new ImageRepository();
