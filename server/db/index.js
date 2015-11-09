var mysql = require('mysql');


var connection = mysql.createConnection({
  user: "root",
  password: "SQL",
  database: "localCast"
});

connection.connect();

module.exports = connection;