//  =================== Import Libraries=====================//
import express from 'express';
import firebase from 'firebase';
import db from './config.js';

const Router = express.Router();
//  ===================Homepage Endpoint=======================//
Router.route('/')
    .get((req, res) => {
        res.send('Welcome to PostIt-App');
    });

//  ======================Sign Up Endpoint============//
Router.route('/user/signup')
    .post((req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                const user = firebase.auth().currentUser;
                user.sendEmailVerification()
                    .then(() => {
                        // Send out verification email to a just registered user
                    });
                db.database().ref('users').push({
                    userEmail: email,
                    UserPassword: password,
                    userName: username
                });
                res.send({
                    message: 'Registration successful and verification email sent to your email'
                });
            })
            .catch(() => {
                res.status(502).send({
                    message: 'Already registered'
                });
            });
    });
//  ======================Sign in Endpoint===========================//

Router.route('/user/signin')
    .post((req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                res.send({
                    message: 'User Signed in successfully'
                });
            })
            .catch(() => {
                res.status(404).send({
                    message: 'Not Found'
                });
            });
    });
//  ======================Sign Out Endpoint========================//

Router.route('/user/signout')
    .post((req, res) => {
        firebase.auth().signOut()
            .then(() => {
                res.send({
                    message: 'Sign-out successful.'
                });
            })
            .catch(() => {
                res.send({
                    message: 'Try again'
                });
            });
    });

//  ===============Create Group Endpoint======================//

Router.route('/group')
    .post((req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const groupName = req.body.group;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                firebase.auth().onAuthStateChanged(() => {
                    const uSer = firebase.auth().currentUser;
                    const uid = uSer.uid;
                    if (uSer !== null) {
                        const group = groupName.toLowerCase();
                        db.database().ref('Group').child(group)
                            .once('value', (snapshot) => {
                                if (snapshot.val() != null) {
                                    res.status(502).send({ message: 'Group already exists' });
                                } else {
                                    db.database().ref('Group').child(group).push({
                                        member: uid
                                    });
                                    res.send({ message: 'Group Created Successfully' });
                                }
                            });
                    }
                });
            })
            .catch(() => {
                res.status(401).send({
                    message: 'User not registered'
                });
            });
    });

//  ============================ADD MEMBER ENDPOINT=================//

Router.route('/group/groupId/user')
    .post((req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const groupName = req.body.group;
        const groupMember = req.body.user;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                const name = groupName.toLowerCase();
                db.database().ref(`Group/${name}`).push({
                    member: groupMember
                });
                res.send({
                    message: 'Member added successfully'
                });
            })
            .catch(() => {
                res.status(401).send({
                    message: 'Not authorized'
                });
            });
    });

// Export apiRouter
export default Router;