'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _index = require('./routes/index.js');

var _index2 = _interopRequireDefault(_index);

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

var _dbConfig = require('./config/dbConfig.js');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// PORT
var port = process.env.PORT || 8080; // BASE SET-UP

var app = (0, _express2.default)();
app.use((0, _compression2.default)());

var getCurrentUser = function getCurrentUser() {
  return new Promise(function (resolve) {
    _dbConfig2.default.auth().onAuthStateChanged(function (user) {
      if (user) {
        resolve(user);
      }
      resolve({});
    });
  });
};
// CONFIG APP
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// configure app to handle CORS requests
app.use(function (req, res, next) {
  getCurrentUser().then(function (user) {
    req.user = user;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, ' + 'content-type, Authorization');
    next();
  });
});

// MIDDLEWARE
app.use((0, _morgan2.default)('dev'));

// Added Webpack
var compiler = (0, _webpack2.default)(_webpackConfig2.default);
app.use((0, _webpackDevMiddleware2.default)(compiler, {
  hot: true,
  publicPath: _webpackConfig2.default.output.publicPath,
  noInfo: true
}));
app.use((0, _webpackHotMiddleware2.default)(compiler));
app.use('/', _index2.default);
app.use(_express2.default.static(_path2.default.join(__dirname, '../client/src/')));
app.get('*', function (req, res) {
  res.sendFile(process.cwd() + '/client/src/index.html');
});

// App listening port
app.listen(port);

module.exports = app;