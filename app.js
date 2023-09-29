const path = require('path');
const mongoDB = require('./server/database.js');
const express = require('express');
const app = express();
require('dotenv').config();

const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
const PORT = process.env.PORT || 3000;

// connect to mongodb
mongoDB.connectToMongoDb();

// serve different routes
app.use(require('./server/routes.js'));

// serve files
app.use(express.static('public'));

// set up views path and view engine
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// start localhost
app.listen(PORT, HOSTNAME, err => {
  if (err) throw err;
  console.log(`Server Running at http://${HOSTNAME}:${PORT}/`);
});

module.exports = app;
