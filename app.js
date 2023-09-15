const http = require('http');
const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

const indexRouter = require('./scripts/index')

// set up views path and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// serve all files in static dir
app.use(express.static(path.join(__dirname, 'static/images')));
app.use(express.static(path.join(__dirname, 'static/css')));

// route index.js to ROOT url
app.use('/', indexRouter);

// start localhost
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
