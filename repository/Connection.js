const mysql = require("mysql2");
const dotenv = require("dotenv");

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

class Connection {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
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
