import express from 'express';
import firebase from 'firebase';
import path from 'path';
import dbConfig from './dbConfig.js';
const Router = express.Router();


// ====================Homepage =====================//

Router.route('/*')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../client/src/index.html'));
  });

// ========================signup Route===================//
Router.route('/signup')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    dbConfig.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => user.sendEmailVerification()
        .then(() => {
          const userId = (firebase.auth().currentUser).uid;
          return Promise.all(
            [dbConfig.database().ref(`users/${userId}`).push({
              userEmail: email,
              userName: username,
              date: (new Date()).toDateString(),
              time: (new Date()).toTimeString()
            }),
              // Default add user`s to general group
            dbConfig.database().ref('Group/general/member')
              .child(`${userId}`).push({
                user: username,
                date: (new Date()).toDateString(),
                time: (new Date()).toTimeString()
              }),
            userId
            ]);
        })
        .then((response) => res.status(200).send({
          message: 'Registration successful and ' +
          'verification email sent to your email', response })
        ))
      .catch((error) => res.status(502).send({ error,
        data: 'error signing up user`s'
      }));
  });

// ======================== signin Route ==================//
Router.route('/signin')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => Promise.all(
        [
          dbConfig.database().ref('users').child(user.uid)
            .once('value', (snapshot) => {
              if (snapshot.val() != null) {
                snapshot.val();
              }
            })
        ]))
      .then((response) => res.status(200).send({
        message: 'User Signed in successfully',
        response
      }))
      .catch((error) => res.status(404).send({ error }));
  });

// ==================== Google Route=====================//
Router.route('/google')
  .post((req, res) => {
    const token = req.body.credential.idToken;
    const credentials = firebase.auth.GoogleAuthProvider.credential(token);
    firebase.auth().signInWithCredential(credentials)
      .then((user) => res.status(200).send({
        message: 'user`s signed in succesfully',
        user
      }))
      .catch((error) => res.status(501).send({ response: error.message }));
  });

Router.route('/passwordreset')
  .post((req, res) => {
    const email = req.body.email;
    firebase.auth().sendPasswordResetEmail(email)
      .then((res) => res.status(200).send({
        message: 'Password reset email sent successfully!'
      }))
      .catch((error) => res.status(404).send({ error }));
  });

//  ===============Create Group Endpoint======================//

Router.route('/userCreateGroup')
  .post((req, res) => {
    const groupName = req.body.group;
    const userId = req.user.uid;
    const group = groupName.toLowerCase();
    return Promise.all(
      [
        dbConfig.database().ref(`Group/${userId}`).child(group)
          .once('value', (snapshot) => {
            if (snapshot.val() != null) {
              snapshot.val();
            } else {
              dbConfig.database().ref(`Group/${userId}`).child(group).push({
                member: userId
              });
              dbConfig.database().ref(`Group/${userId}`).child(group)
                .once('value', (snap) => {
                  if (snap.val() != null) {
                    snap.val();
                    dbConfig.database().ref('Group').child(userId)
                      .once('value', (get) => {
                        if (get.val() != null) {
                          get.val();
                        }
                      });
                  }
                });
            }
          })
      ])
      .then((response) => res.status(200).send({
        message: 'Group created succesfully', response }))
      .catch((error) => res.status(401).send({ err: 'User not signed iiii!',
        error
      }));
  });

// ========================Get Groups=================//
Router.route('/getUserGroups')
  .post((req, res) => {
    const userId = req.user.uid;
    return Promise.all(
      [
        dbConfig.database().ref('Group').child(userId)
          .once('value', (snapshot) => {
            if (snapshot.val() != null) {
              snapshot.val();
            }
          })
      ])
      .then((response) => res.status(200).send({ response }))
      .catch((error) => res.status(500).send({ error }));
  });

// ================== Get all Registered Users ================//
Router.route('/getGeneralUsers')
  .post((req, res) => Promise.all([
    dbConfig.database().ref('Group/general').child('member')
      .once('value', (snapshot) => {
        if (snapshot.val() != null) {
          snapshot.val();
        }
      })
  ])
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(401).send({ error })));


// ================ Get all members of a group ===============//
Router.route('/getGroupMember')
  .post((req, res) => {
    const groupName = req.body.group;
    const userId = req.user.uid;
    return Promise.all(
      [
        dbConfig.database().ref(`Group/${userId}`).child(groupName)
          .once('value', (snapshot) => {
            if (snapshot.val() != null) {
              snapshot.val();
            }
          })
      ])
      .then((response) => res.status(200).send({
        message: `Hey, here are members of the group ${groupName}`,
        response }))
      .catch((error) => res.status(401).send(error));
  });

// ============================ADD MEMBER ENDPOINT=================//
Router.route('/group/member')
  .post((req, res) => {
    const groupName = req.body.group;
    const groupMember = req.body.member;
    const userId = req.user.uid;
    const name = groupName.toLowerCase();
    return Promise.all(
      [
        dbConfig.database().ref(`Group/${userId}`).child(name).push({
          member: groupMember
        }),
        dbConfig.database().ref('Group').child(userId)
          .once('value', (get) => {
            if (get.val() != null) {
              get.val();
            }
          })
      ])
      .then((response) => res.status(200).send({
        message: 'Member added successfully', response }))
      .catch((error) => res.status(500).send({ message: 'Not authorized',
        error }));
  });

// ================sendGeneralMessage===============//
Router.route('/sendGeneralMessage')
  .post((req, res) => {
    const userId = req.user.uid;
    const message = req.body.message;
    const date = (new Date()).toDateString();
    const time = (new Date()).toTimeString();
    if (userId === undefined) {
      return Promise.all([{
        error: 'PERMISSION_DENIED'
      }])
        .then((response) => res.status(400).send({ response }));
    }
    return Promise.all([
      dbConfig.database().ref('Group/general/message').child(userId).push({
        message, date, time }),
      { message, date, time }
    ])
      .then((response) => res.status(200).send({ response }))
      .catch((error) => res.send({ error }));
  });

// =================getGeneralMessage ==============//
Router.route('/getGeneralMessage')
  .post((req, res) => Promise.all([
    dbConfig.database().ref('Group/general').child('message')
      .once('value', (snapshot) => snapshot.val())
  ])
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({ error }))
  );

// ============sendGroupMessage ==================//
Router.route('/sendGroupMessage')
  .post((req, res) => {
    const groupName = req.body.group;
    const message = req.body.message;
    const group = groupName.toLowerCase();
    const userId = req.user.uid;
    const date = (new Date()).toDateString();
    const time = (new Date()).toTimeString();
    return Promise.all(
      [
        dbConfig.database().ref(`Group/${userId}`).child(group)
          .orderByKey().on('child_added', (data) => {
            dbConfig.database().ref(`Group/${userId}`)
              .child(`${group}/${data.key}`).push({ message, date, time });
          }),
        dbConfig.database().ref(`Group/${userId}`).child(group)
          .once('value', (snapshot) => {
            if (snapshot.val() != null) {
              snapshot.val();
            }
          }),
        { message, date, time }
      ])
      .then((response) => res.status(200).send({
        message: 'Broadcast Message sent successfully', response }))
      .catch((error) => res.send({ error }));
  });

Router.route('/getGroupMessage')
  .post((req, res) => {
    const group = req.body.group;
    const userId = req.user.uid;
    return Promise.all(
      [
        dbConfig.database().ref(`Group/${userId}`).child(group)
          .once('value', (snapshot) => snapshot.val())
      ])
      .then((response) => res.status(200).send({ response }))
      .catch((error) => res.status(400).send({ error }));
  });

// ===================== Sign Out Route ==============
Router.route('/signout')
  .post((req, res) => {
    firebase.auth().signOut()
      .then(() => {
        req.user = {};
        res.status(200).send({ message: 'User`s signed-out successfully.' });
      })
      .catch(() => res.status(404).send({ message: 'Network Error' }));
  });


// export Router
export default Router;
