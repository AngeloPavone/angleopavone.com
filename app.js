const path = require('path')
const express = require('express')
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

const routes = require('./scripts/routes');

// set up views path and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// serve all files in static dir
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'fonts')));
app.use(express.static(path.join(__dirname, 'static/css')));

// serve different routes
app.use( routes);

// start localhost
app.listen(port, hostname, err  => {
  if(err) throw err;
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
