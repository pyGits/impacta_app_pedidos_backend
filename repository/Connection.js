const mysql = require("mysql2");

class Connection {
  constructor() {
    this.pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "6425025x",
      database: "delivery_impacta",
    });
    this.pool.promise = this.pool.promise();
  }

  // Método para obter uma conexão
  getConnection() {
    return this.pool.promise.getConnection();
  }

  // Método para executar uma query
  async query(sql, params) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.query(sql, params);
      return rows;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  // Método para fazer SELECT
  async select(sql, params) {
    return this.query(sql, params);
  }
  async selectOne(sql, params) {
    const res = await this.query(sql, params);
    return res[0];
  }

  // Método para fazer INSERT
  async insert(sql, params) {
    return this.query(sql, params);
  }

  // Método para fazer UPDATE
  async update(sql, params) {
    return this.query(sql, params);
  }

  // Método para fazer DELETE
  async delete(sql, params) {
    return this.query(sql, params);
  }
}

module.exports = new Connection();
