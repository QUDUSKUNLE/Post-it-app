// BASE SET-UP
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import compression from 'compression';

// Noted
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.dev.js';

import router from './routes/router';

const port = process.env.PORT || 8080;
const app = express();
app.use(compression());

// CONFIG APP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

// configure app to handle CORS requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
  res.setHeader('Access-Control-Allow-Headers',
    'X-Requested-With, content-type, Authorization');
  next();
});

// MIDDLEWARE
app.use(morgan('dev'));

// Added Webpack Noted
const compiler = webpack(config);
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler));

app.use('/', router);
app.use(express.static(path.join(__dirname, '../client/src/')));
app.get('*', (req, res) => {
  res.sendFile(`${process.cwd()}/client/src/index.html`);
});

// App listening port
app.listen(port);

module.exports = app;
