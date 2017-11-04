// BASE SET-UP
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import Router from './routes/index.js';
import dbConfig from './config/index.js';

const port = process.env.PORT || 8080;
const app = express();
app.use(compression());

// Get current user
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
app.use('/', Router);
app.use(express.static(path.join(__dirname, '../client/src/')));
app.get('*', (req, res) => {
  res.sendFile(`${process.cwd()}/client/src/index.html`);
});

// App listening port
app.listen(port);

module.exports = app;
