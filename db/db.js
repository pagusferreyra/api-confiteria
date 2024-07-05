const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "mysql-pagus.alwaysdata.net", 
  user: process.env.DB_USER || "pagus_confiteria",
  password: process.env.DB_PASSWORD || "confiteria-cac",
  database: process.env.DB_NAME || "pagus_confiteria",
});

connection.connect((error) => {
  if (error) {
    return console.error(error);
  }
  console.log("Conectado");
});

module.exports = connection;