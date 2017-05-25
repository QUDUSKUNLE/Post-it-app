"use strict";


// ====================================== Import Libraries=========================================================//
import express from "express";
import firebase from "firebase";
const Router = express.Router();

//======================================Firebase Configuration======================================================// 
let config = {
    apiKey: "AIzaSyBUL7H7Vull9iAEuPIvI1C2yXHHT2hyf7w",
    authDomain: "post-it-app.firebaseapp.com",
    databaseURL: "https://post-it-app.firebaseio.com",
    projectId: "post-it-app",
    storageBucket: "post-it-app.appspot.com",
    messagingSenderId: "465033980113"
};
firebase.initializeApp(config);

//=================================Homepage Endpoint===================================================================//
Router.route("/")
    .post((req, res) => {
        res.send('Welcome to PostIt-App');
    });

//==================================Sign Up Endpoint=====================================================================//
Router.route("/user/signup")
    .post((req, res) => {
        let email = req.body.email,
            password = req.body.password,
            username = req.body.username;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                firebase.database().ref("users").push({
                    userEmail: email,
                    UserPassword: password,
                    userName: username
                });
                res.send({
                    message: "Registration successful"
                });
            })
            .catch((error) => {
                res.send({
                    message: "error in Registration " + error.message
                });
            });
    });

//============================================Sign in Endpoint======================================================//

Router.route("/user/signin")
    .post((req, res) => {
        let email = req.body.email,
            password = req.body.password;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                res.send({
                    message: "User Signed in successfully"
                });
            })
            .catch(error => {
                res.send({
                    message: error.code + " " + error.message
                });
            });
    });
// ===========================================Sign Out Endpoint===================================================//

Router.route("/user/signout")
    .post((req, res) => {
        firebase.auth().signOut()
            .then(() => {
                res.send({
                    message: "Sign-out successful."
                })
            }).catch((error) => {
                res.send({
                    message: "Try again"
                });
            });
    });


//=====================================Create Group Endpoint=======================================================//

Router.route("/group")
    .post((req, res) => {
        let email = req.body.email,
            password = req.body.password,
            groupName = req.body.group;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                firebase.auth().onAuthStateChanged((user) => {
                    let uSer = firebase.auth().currentUser,
                        uid = uSer.uid;
                    if (uSer !== null) {
                        let group = groupName.toLowerCase();
                        firebase.database().ref("Group").child(group).once("value", (snapshot) => {
                            if (snapshot.val() != null) {
                                res.json({ message: "Group already exists" })
                            } else {
                                firebase.database().ref("Group").child(group).push({
                                    member: uid
                                });
                                res.send({ message: "Group Created Successfully" })
                            }
                        });
                    }
                })
            });
    })

//=========================================ADD MEMBER ENDPOINT===============================================//

Router.route('/group/groupId/user')
    .post((req, res) => {
        let email = req.body.email,
            password = req.body.password,
            groupName = req.body.groupname,
            groupMember = req.body.user,
            groupId = req.body.groupId;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                let name = groupName.toLowerCase()
                firebase.database().ref("Group/" + name).push({
                    member: groupMember
                })
                res.send({
                    message: "Member added successfully"
                });
            }).catch((error) => {
                res.send({
                    message: "Ouch!!! Not an authenticated User"
                });
            });

    });
export default Router; // Export apiRouter