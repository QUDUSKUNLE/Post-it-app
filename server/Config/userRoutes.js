//  ===================Import Libraries=====================//
import express from 'express';
import firebase from 'firebase';
import path from 'path';
import db from './config.js';

const Router = express.Router();

//  ===================Homepage Endpoint=======================//
Router.route('/*')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../client/src/index.html'));
  });

//  ======================Sign Up Endpoint============//
Router.route('/signup')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        const userId = user.uid;
        user.sendEmailVerification()
          .then(() => {
            db.database().ref(`users/${userId}`).push({
              userEmail: email,
              UserPassword: password,
              userName: username
            });
            res.send({
              message: 'Registration successful and ' +
                        'verification email sent to your email'
            });
          })
          .catch(() => {
            res.status(404).send({
              message: 'Network Error'
            });
          });
      })
      .catch(() => {
        res.status(502).send({
          message: 'Already registered'
        });
      });
  });
//  ======================Sign in Endpoint===========================//
Router.route('/signin')
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
Router.route('/signout')
  .post((req, res) => {
    firebase.auth().signOut()
      .then(() => {
        res.send({
          message: 'User`s signed-out successfully.'
        });
      })
      .catch(() => {
        res.status(404).send({
          message: 'Network Error'
        });
      });
  });

//  ==========================Password Reset ==================//
Router.route('/passwordreset')
  .post((req, res) => {
    const email = req.body.email;
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        res.send({
          message: 'Password reset email sent successfully!'
        });
      })
      .catch((error) => {
        res.status(404).send({
          message: error.message
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
            db.database().ref(`Group/${uid}`).child(group)
              .once('value', (snapshot) => {
                if (snapshot.val() != null) {
                  res.status(502).send({ message: 'Group already exists' });
                } else {
                  db.database().ref(`Group/${uid}`).child(group).push({
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
          message: 'User`s not registered'
        });
      });
  });

// ========================Get Groups=================//

Router.route('/groupList')
  .post((req, res) => {
    db.database().ref('Group').once('value', (snapshot) => {
      const groupList = snapshot.val();
      res.send({ groupList });
  });

//  ============================ADD MEMBER ENDPOINT=================//

Router.route('/group/member')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const groupName = req.body.group;
    const groupMember = req.body.member;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        const uSer = (firebase.auth().currentUser).uid;
        const name = groupName.toLowerCase();
        db.database().ref(`Group/${uSer}`).child(name).push({
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

//	===============Delete a user`s Account=============//

Router.route('/delete')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        const userId = user.uid;
        db.database().ref(`users/${userId}`).remove();
        user.delete()
        .then(() => {
          res.send({
            message: 'User`s deleted successfully '
          });
        })
        .catch(() => {
          res.status(404).send({
            message: 'Network Error'
          });
        });
      })
      .catch(() => {
        res.status(404).send({
          message: 'User`s not Found'
        });
      });
  });

// ================Message===============//

Router.route('/groupName/message')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const groupName = req.body.group;
    const mess = req.body.message;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        const group = groupName.toLowerCase();
        const userId = (firebase.auth().currentUser).uid;
        const groupRef = db.database().ref(`Group/${userId}`).child(group);
        groupRef.orderByKey().on('child_added', (data) => {
          groupRef.child(data.key).push({
            message: mess
          });
        });
        res.send({
          message: 'Broadcast Message sent successfully'
        });
      })
      .catch(() => {
        res.status(404).send({
          message: 'User`s not registered'
        });
      });
  });

export default Router;
