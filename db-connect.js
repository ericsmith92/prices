const mysql = require('mysql');
require('dotenv').config();

//using a pool of connections, see:
//https://stackoverflow.com/questions/32650604/close-connection-mysql-node-js/32650853#:~:text=It%20is%20slow%20to%20connect,close%20the%20connection%20to%20mysql.


const config = {
  connectionLimit : 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}

class DB {
  constructor() {
      this.config = config;
      this.pool = mysql.createPool( config );
  }
  query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.pool.query( sql, args, ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
  }
  close() {
      return new Promise( ( resolve, reject ) => {
          this.pool.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
  }
}

module.exports = DB;

