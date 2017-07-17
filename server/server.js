//  BASE SET-UP
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
const Router = require('./config/userRoutes.js');
const config = require('config');

// PORT
const port = process.env.PORT || 8080;
const app = express();

// CONFIG APP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// configure app to handle CORS requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,' +
	'content-type, Authorization');
  next();
});
// MIDDLEWARE
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('dev')); // log all requests to the console
}

// Register our routes - all routes
app.use('/', Router);

app.listen(port);
console.log(`port: ${port}`);

module.exports = app;
