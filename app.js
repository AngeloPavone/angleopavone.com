const http = require('http');
const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express();
const session = require('express-session');
const mongo = require('mongoose')

const hostname = '127.0.0.1';
const port = 3000;

const routes = require('./scripts/routes');

// set up views path and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// serve all files in static dir
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'static/css')));

// route index.js to ROOT url
app.use('/', routes);
app.use('/blog/', routes);

// start localhost
app.listen(port, hostname, err  => {
  if(err) throw err
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;