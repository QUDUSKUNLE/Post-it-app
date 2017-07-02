//  BASE SET-UP
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import Router from './config/userRoutes.js';
import webpack from 'webpack';
import compression from 'compression';
<<<<<<< HEAD
=======
// import connect from 'connect';
>>>>>>> dd1349d380e724cb9260e7c26c77a7fc6a387194
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
// import historyFallback from 'express-history-api-fallback';
import config from '../webpack.config.js';
import path from 'path';


// PORT
const port = process.env.PORT || 8080;
const app = express();
app.use(compression());
<<<<<<< HEAD
=======
// app.use(historyFallback());
>>>>>>> dd1349d380e724cb9260e7c26c77a7fc6a387194

// CONFIG APP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, ' +
  'content-type, Authorization');
  next();
});

// MIDDLEWARE
app.use(morgan('dev')); // log all requests to the console


// Added Webpack
const compiler = webpack(config);
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use('/', Router);

// App listening port
app.listen(port);


module.exports = app;
