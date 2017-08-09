import firebase from 'firebase';
import dotenv from 'dotenv';
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

export default db; // export db
