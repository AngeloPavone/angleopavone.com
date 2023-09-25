const path = require('path');
const mongoDB = require('./database-setup');
const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

// connect to mongodb
mongoDB.connectToMongoDB();

// serve different routes
const routes = require('./routes');
app.use(routes);

// serve files
app.use(express.static('public'))

// set up views path and view engine
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// start localhost
app.listen(port, hostname, err => {
  if (err) throw err;
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
