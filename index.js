const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');

app = express();
app.use('/library', express.static(__dirname + '/library'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

const price = require('./prices');
const DB = require('./db-connect');
const db = new DB();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/query', (req, res) => {
  db.query(`SELECT * FROM equities`)
    .then(rows => res.json({data : rows}))
});

app.post('/insert', (req, res) => {
  const symbol = req.body.symbol.toUpperCase();

  console.log(symbol);

  price(symbol).then(result => {
    const sql = `INSERT INTO equities (name, price) VALUES ('${result[0]}', ${result[1]})`;
    db.query(sql)
    .then(rows => res.json({data : rows}))
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
});

app.listen(3128);