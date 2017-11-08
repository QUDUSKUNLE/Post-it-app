// BASE SET-UP
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackConfig from '../webpack.dev';
import webpackMiddleWare from 'webpack-dev-middleware';

import compression from 'compression';
import Router from './routes/index';

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

const compiler = webpack(webpackConfig);

app.use(webpackMiddleWare(
  compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
// MIDDLEWARE
app.use(morgan('dev'));
app.use('/', Router);
app.use(express.static(path.join(__dirname, '../client/src/')));
app.get('*', (req, res) => {
  res.sendFile(`${process.cwd()}/client/src/index.html`);
});

// App listening port
app.listen(port);

module.exports = app;
