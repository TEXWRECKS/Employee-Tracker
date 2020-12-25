const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3000,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "employeetracker_db"
});

module.exports = connection;
