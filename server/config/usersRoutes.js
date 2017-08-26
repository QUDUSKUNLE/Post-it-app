import express from 'express';
import firebase from 'firebase';
import path from 'path';
import dbConfig from './dbConfig.js';
const Router = express.Router();


Router.route('/*')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../client/src/index.html'));
  });

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
              userPassword: password,
              userName: username,
              date: (new Date()).toDateString(),
              time: (new Date()).toTimeString()
            }),
              // Default add user`s to general group
            dbConfig.database().ref('Group').child(`general/${userId}`).push({
              user: username,
              userID: userId,
              date: (new Date()).toDateString(),
              time: (new Date()).toTimeString()
            }),
            userId
            ]);
        })
        .then((response) => res.status(200).send({
          message: 'Registration successful and ' +
          'verification email sent to your email', data: response })
        ))
      .catch((error) => res.status(502).send({ message: error,
        data: 'error signing up user`s'
      }));
  });


Router.route('/signin')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        const uID = user.uid;
        return Promise.all(
          [
            dbConfig.database().ref('Group').child('general')
              .once('value', (groups) => {
                if (groups.val() != null) {
                  groups.val();
                }
              }),
            uID,
            dbConfig.database().ref('users').child(uID)
              .once('value', (snapshot) => {
                if (snapshot.val() != null) {
                  snapshot.val();
                }
              })
          ]);
      })
      .then((response) => res.status(200).send({
        message: 'User Signed in successfully',
        data: { response }
      }))
      .catch((error) => res.status(404).send({ err: error }));
  });


Router.route('/signout')
  .post((req, res) => {
    firebase.auth().signOut()
      .then(() => {
        req.user = {};
        res.send({ message: 'User`s signed-out successfully.' });
      })
      .catch(() => res.status(404).send({ message: 'Network Error' }));
  });


Router.route('/passwordreset')
  .post((req, res) => {
    const email = req.body.email;
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => res.send({
        message: 'Password reset email sent successfully!'
      }))
      .catch((err) => res.status(404).send({ message: err.code }));
  });

//  ===============Create Group Endpoint======================//
Router.route('/creategroup')
  .post((req, res) => {
    const groupName = req.body.group;
    const uId = req.user.uid;
    // console.log(uId, 'userid');
    const group = groupName.toLowerCase();
    return Promise.all(
      [
        dbConfig.database().ref(`Group/${uId}`).child(group)
          .once('value', (snapshot) => {
            if (snapshot.val() != null) {
              snapshot.val();
            } else {
              dbConfig.database().ref(`Group/${uId}`).child(group).push({
                member: uId
              });
              dbConfig.database().ref(`Group/${uId}`).child(group)
                .once('value', (snap) => {
                  if (snap.val() != null) {
                    snap.val();
                    dbConfig.database().ref('Group').child(uId)
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
Router.route('/getgroups')
  .post((req, res) => {
    const uID = req.user.uid;
    return Promise.all(
      [
        dbConfig.database().ref('Group').child(uID)
          .once('value', (snapshot) => {
            if (snapshot.val() != null) {
              snapshot.val();
            }
          })
      ])
      .then((response) => res.status(200).send({ response }))
      .catch((error) => res.status(401).send({ error }));
    // const uID = (firebase.auth().currentUser).uid;
  });


//  get members of General Group
Router.route('/generallist')
  .post((req, res) => {
    const groupName = 'general';
    return Promise.all(
      [
        dbConfig.database().ref('Group').child('general')
          .once('value', (snapshot) => {
            if (snapshot.val() != null) {
              snapshot.val();
            }
          }),
        groupName
      ])
      .then((response) => res.status(200).send({ response }))
      .catch((error) => res.status(401).send({ error }));
  });


// GET MEMBER OF A PARTUCULAR group
Router.route('/memberlist')
  .post((req, res) => {
    const groupName = req.body.group;
    const uID = req.user.uid;
    return Promise.all(
      [
        dbConfig.database().ref(`Group/${uID}`).child(groupName)
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


// //  ============================ADD MEMBER ENDPOINT=================//
Router.route('/group/member')
  .post((req, res) => {
    const groupName = req.body.group;
    const groupMember = req.body.member;
    const uID = req.user.uid;
    const name = groupName.toLowerCase();
    return Promise.all(
      [
        dbConfig.database().ref(`Group/${uID}`).child(name).push({
          member: groupMember
        }),
        dbConfig.database().ref('Group').child(uID)
          .once('value', (get) => {
            if (get.val() != null) {
              get.val();
            }
          })
      ])
      .then((response) => res.status(200).send({
        message: 'Member added successfully', response }))
      .catch((error) => res.status(401).send({
        message: 'Not authorized', error }));
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
        // delete user details from Groups and  user`s membership
        dbConfig.database().ref('users').child(userId).remove();
        dbConfig.database().ref('Group').child(userId).remove();
        user.delete()
          .then(() => {
            // Server response for successfully delete account
            res.send({ message: 'User`s deleted successfully' });
          })
          // Catch error for network error
          .catch(() => {
            res.status(404).send({ message: 'Network Error' });
          });
      })
      // Catch for non registered user
      .catch((err) => {
        res.status(404).send({ message: err });
      });
  });

// ================Message===============//

Router.route('/groupName/message')
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
          })
      ])
      .then((response) => res.status(200).send({
        message: 'Broadcast Message sent successfully', response }))
      .catch((error) => res.send({ error }));
  });

// export Router
export default Router;
