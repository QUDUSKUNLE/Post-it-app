"use strict";
// BASE SET-UP
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import multer from 'multer';
import Router from './Config/users.js';

let upload = multer();
let app = express();

// PORT
let port = process.env.PORT || 8080;


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

//================================================LOG ALL REQUEST TO CONSOLE========================================//
// MIDDLEWARE 
app.use(morgan('dev')); // log all requests to the console

// Register our routes - all routes
app.use('/', Router);

app.listen(port);
console.log('port: ' + port);