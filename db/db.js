const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "mysql-pagusf.alwaysdata.net", 
  user: process.env.DB_USER || "pagusf_c",
  password: process.env.DB_PASSWORD || "confiteria-cac",
  database: process.env.DB_NAME || "pagusf_confiteria",
});

connection.connect((error) => {
  if (error) {
    return console.error(error);
  }
  console.log("Conectado");
});

module.exports = connection;