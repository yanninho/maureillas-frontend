'use strict';

var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.use(gzippo.staticGzip("" + __dirname + "/build/dist"));
app.listen(process.env.PORT || 5000);