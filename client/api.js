// SignUp models

import express from "express";
import firebase from "firebase";

//==============================firebase setup============================//
firebase.initializeApp({
    databaseURL: "https://post-it-app.firebaseio.com/",
    serviceAccount: "./postItApp.json"
});
const db = firebase.database();
const usersRef = db.ref("users");
const Router = express.Router();

//==============================API MIDDLEWARE =============================//
Router.use((req, res, next) => {
    console.log("someone just came to the app");
    // this is where we authenticate users
    next();
});

//===============================API Routes ===============================//
Router.get('/', (req, res) => {
    res.json({ message: 'Whao, check out this json file' });
});

//==============================Create a User===========================//
Router.route('/user/signup')
    //create a user
    .post((req, res) => {

        let user = {};
        user.userName = req.body.userName;
        user.userEmail = req.body.userEmail;
        user.userPassword = req.body.userPassword;
        usersRef.push({
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword
        }, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: "Success: User created." });
            }
        });

    });

//========================Get All Users=========================================//
Router.route('/users')
    .get((req, res) => {
        // Firebase get all users
        usersRef.once("value", (snapshot, prevChildKey) => {
            res.json(snapshot.val());
        });
    });

//============================Get A User===========================//
Router.route('/user/:uid')
    // User Routes
    .get((req, res) => {
        // Firebase GET user info
        let uid = req.params.uid;
        // in firebase there is no way to access a single object
        // Use startAt(uid) then endAt(uid + a really high point value unicode character)
        // then ensure uid is 20 characters long other wise lots of children will be returned
        if (uid.length != 20) {
            res.json({ message: "Error: uid must be 20 characters long." });
        } else {
            usersRef.child(uid).once("value", (snapshot) => {
                if (snapshot.val() === null) {
                    res.json({ message: "Error: No user found with that uid" });
                } else {
                    res.json(snapshot.val());
                }
            });
        }
    });

//==========================Update User ========================//
Router.route('/user/:uid')
    .put((req, res) => {
        // Firebase Update user info
        let uid = req.params.uid,
            user = {};

        // update only parameters sent in request
        if (req.body.userName) user.userName = req.body.userName;
        if (req.body.userEmail) user.userEmail = req.body.userEmail;
        if (req.body.userPassword) user.userPassword = req.body.userPassword;

        usersRef.child(uid).update(user, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: "Success: User information correctly updated." });
            }
        });

    });

//====================================Delete User=======================//
Router.route('/user/:uid')
    .delete((req, res) => {
        // DELETE user
        let uid = req.params.uid;

        usersRef.child(uid).remove((err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: "Success: User deleted." });
            }
        });
    });

// Export apiRouter
export default Router;