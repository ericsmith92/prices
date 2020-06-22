const cron = require("node-cron");
const express = require("express");
const fs = require("fs");

const prices = require('./prices');

app = express();

cron.schedule("* * * * *", function() {
    prices();
});

  app.listen(3128);