// ====================================== Import Libraries=========================================================//
import express from "express";
import db from "./config.js";

const Router = express.Router();
//=================================Homepage Endpoint===================================================================//
Router.route("/")
    .get((req, res) => {
        res.send('Welcome to PostIt-App');
    });

//==================================Sign Up Endpoint=====================================================================//
Router.route("/user/signup")
    .post((req, res) => {
        let email = req.body.email,
            password = req.body.password,
            username = req.body.username;
        db.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                db.database().ref("users").push({
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
        db.auth().signInWithEmailAndPassword(email, password)
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
        db.auth().signOut()
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
        db.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                db.auth().onAuthStateChanged((user) => {
                    let uSer = firebase.auth().currentUser,
                        uid = uSer.uid;
                    if (uSer !== null) {
                        let group = groupName.toLowerCase();
                        db.database().ref("Group").child(group).once("value", (snapshot) => {
                            if (snapshot.val() != null) {
                                res.json({ message: "Group already exists" })
                            } else {
                                db.database().ref("Group").child(group).push({
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

        db.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                let name = groupName.toLowerCase()
                db.database().ref("Group/" + name).push({
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