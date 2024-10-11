const mysql = require("mysql2");
const dotenv = require("dotenv");
const fs = require("fs").promises;

dotenv.config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

con.connect(async function (err) {
  if (err) throw err;
  con.query(
    `CREATE DATABASE IF NOT EXISTS delivery_impacta`,
    function (err, result) {
      if (err) throw err;
      console.log("Banco de dados criado");
    }
  );

  const schema = (await fs.readFile("./database.sql")).toString();
  console.log("cschema", schema);
  const queries = schema.split(";").filter((query) => query.trim());
  for (const query of queries) {
    // console.log("query");
    con.query(query);
  }
  console.log("Tabelas criadas !");
});
