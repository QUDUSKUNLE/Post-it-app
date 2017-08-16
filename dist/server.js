'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _userRoutes = require('./config/userRoutes');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpackConfig = require('../webpack.config.js');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// PORT
var port = process.env.PORT || 8080;
// BASE SET-UP

var app = (0, _express2.default)();
app.use((0, _compression2.default)());

// CONFIG APP
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// configure app to handle CORS requests
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, ' + 'content-type, Authorization');
  next();
});

// MIDDLEWARE
app.use((0, _morgan2.default)('dev')); // log all requests to the console


// Added Webpack
var compiler = (0, _webpack2.default)(_webpackConfig2.default);
app.use((0, _webpackDevMiddleware2.default)(compiler, {
  hot: true,
  publicPath: _webpackConfig2.default.output.publicPath,
  noInfo: true
}));
app.use((0, _webpackHotMiddleware2.default)(compiler));

app.use('/', _userRoutes2.default);

// App listening port
app.listen(port);

module.exports = app;