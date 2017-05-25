import firebase from 'firebase';
import dotenv from 'dotenv';
dotenv.config();

//======================================Firebase Configuration======================================================// 
let config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
};
let db = firebase.initializeApp(config);

export default db; // export db