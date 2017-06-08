//  BASE SET-UP
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import Router from './Config/userRoutes.js';

// New Addition
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config';


// PORT
const port = process.env.PORT || 8080;
const app = express();

// CONFIG APP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// configure app to handle CORS requests

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, \
	content-type, Authorization');
    next();
});

// MIDDLEWARE
app.use(morgan('dev')); // log all requests to the console
// Register our routes - all routes

// Added Webpack
// const compiler = webpack(config);
// app.use(webpackMiddleware(compiler, {
//     hot: true,
//     publicPath: config.output.publicPath,
//     noInfo: true
// }));

app.use(webpackMiddleware(webpack(config)));

app.use('/', Router);

app.listen(port);
console.log('port: ' + port);


module.exports = app;