const Connection = require("./Connection");
class ImageRepository {
  constructor() {
    this.connection = Connection;
  }
  async getAll() {
    return await Connection.select("select * from imagem");
  }

  async insert(image_name) {
    await Connection.insert("insert into imagem (nome) values (?)", [
      image_name,
    ]);
  }
}

module.exports = new ImageRepository();
