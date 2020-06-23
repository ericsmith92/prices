const cron = require("node-cron");
const express = require("express");
const fs = require("fs");

const price = require('./prices');

const DB = require('./db-connect');
const db = new DB();

app = express();
/*
cron.schedule("* * * * *", function() {
    prices();
});
*/

db.connect();
const stockInfo = price().then(result => {
  const sql = `INSERT INTO equities (name, price) VALUES ('${result[0]}', ${result[1]})`;
  db.insert(sql);
})
.catch(err => {
  console.log(err);
});


app.listen(3128);