const cron = require("node-cron");
const express = require("express");
const fs = require("fs");

const prices = require('./prices');

const DB = require('./db-connect');
const db = new DB();

app = express();
/*
cron.schedule("* * * * *", function() {
    prices();
});
*/

db.connect();

app.listen(3128);