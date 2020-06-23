const mysql = require('mysql');
require('dotenv').config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

class DB {
  constructor(con) {
    this.con = con;
  }

  connect(){
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
  }

  insert(sql){
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log("query complete");
      console.log(result);
    });
  }
}

module.exports = DB;

