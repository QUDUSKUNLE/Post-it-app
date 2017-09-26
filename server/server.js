// BASE SET-UP
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import Router from './controllers/routes';
import webpack from 'webpack';
import compression from 'compression';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.js';
import dbConfig from './config/dbConfig.js';

// PORT
const port = process.env.PORT || 8080;
const app = express();
app.use(compression());

const getCurrentUser = () => new Promise((resolve) => {
  dbConfig.auth().onAuthStateChanged((user) => {
    if (user) {
      resolve(user);
    }
    resolve({});
  });
});
// CONFIG APP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use((req, res, next) => {
  getCurrentUser().then((user) => {
    req.user = user;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, ' +
        'content-type, Authorization');
    next();
  });
});

// MIDDLEWARE
app.use(morgan('dev'));

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
