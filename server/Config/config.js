const firebase = require('firebase');
const dotenv = require('dotenv');
dotenv.config();

//  =============Firebase Configuration=============================//
const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};
const db = firebase.initializeApp(config);
// export db
module.exports = db;
