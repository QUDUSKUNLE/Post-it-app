"use strict";
// BASE SET-UP

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _userRoutes = require('./Config/userRoutes.js');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// PORT
var port = process.env.PORT || 8080;

// CONFIG APP
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// configure app to handle CORS requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, \
		content-type, Authorization');
    next();
});

//================================================LOG ALL REQUEST TO CONSOLE========================================//
// MIDDLEWARE 
app.use((0, _morgan2.default)('dev')); // log all requests to the console

// Register our routes - all routes
app.use('/', _userRoutes2.default);

app.listen(port);
console.log('port: ' + port);