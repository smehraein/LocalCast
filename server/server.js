// set up ======================================================================
var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var morgan  = require('morgan');
var parser  = require('body-parser');
var router  = require('./routes.js');

// configuration ===============================================================
app.use(morgan('dev'));
app.use(parser.json());
app.use("/", router);

// launch ======================================================================
app.use(express.static(__dirname + "/../client"));

app.listen(port);
console.log("Listening on ", port);