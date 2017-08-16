
// =================== Import Libraries =====================//
import express from 'express';
import firebase from 'firebase';
import path from 'path';
import db from './config.js';

const Router = express.Router();

//  ===================Homepage Endpoint==============//
Router.route('/*')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../client/src/index.html'));
  });

//   //  ======================Sign Up Endpoint============//
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
            // Add user`s to registered users
            db.database().ref(`users/${userId}`).push({
              userEmail: email,
              userPassword: password,
              userName: username,
              date: (new Date()).toDateString(),
              time: (new Date()).toTimeString()
            });
            // Default add user`s to general group
            db.database().ref('Group').child(`general${userId}`).push({
              user: username,
              userID: userId,
              date: (new Date()).toDateString(),
              time: (new Date()).toTimeString()
            });
            res.send({
              message: 'Registration successful and ' +
                        'verification email sent to your email',
              data: {
                email,
                password,
                username,
                userId
              }
            });
          })
          .catch(() => {
            res.status(404).send({
              message: 'Network Error'
            });
          });
      })
      .catch((error) => {
        res.status(502).send({
          message: error,
          data: 'error signing in user`s'
        });
      });
  });
//  ======================Sign in Endpoint=============//
Router.route('/signin')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        const uID = firebase.auth().currentUser.uid;
        db.database().ref('users').child(uID)
          .once('value', (snapshot) => {
            if (snapshot.val() != null) {
              const userDetail = snapshot.val();
              db.database().ref('Group').child('general')
                .once('value', (groups) => {
                  if (groups.val() != null) {
                    const userGroups = groups.val();
                    res.send({
                      message: 'User Signed in successfully',
                      data: {
                        uID,
                        userDetail,
                        userGroups
                      }
                    });
                  } else {
                    // userDetails
                    res.send({
                      message: 'User Signed in successfully',
                      data: {
                        uID,
                        userDetail
                      }
                    });
                  }
                });
            }
          });
      })
      .catch((error) => {
        res.status(404).send({
          err: error
        });
      });
  });

//  ======================Sign Out Endpoint============//
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

// // //  ==========================Password Reset ==================//

Router.route('/passwordreset')
  .post((req, res) => {
    const email = req.body.email;
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        res.send({
          message: 'Password reset email sent successfully!'
        });
      })
      .catch((err) => {
        res.status(404).send({
          message: err.code
        });
      });
  });

//  ===============Create Group Endpoint======================//
Router.route('/creategroup')
  .post((req, res) => {
    let groupMember;
    const email = req.body.email;
    const password = req.body.password;
    const groupName = req.body.group;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        if (user) {
          const group = groupName.toLowerCase();
          db.database().ref(`Group/${uid}`).child(group)
            .once('value', (snapshot) => {
              if (snapshot.val() != null) {
                groupMember = snapshot.val();
                // if current group already exists, output group members and
                // group name
                res.status(502).send({
                  message: 'Group already exists',
                  groupMember,
                  group: groupName
                });
              } else {
                db.database().ref(`Group/${uid}`).child(group).push({
                  member: uid
                });
                db.database().ref(`Group/${uid}`).child(group)
                  .once('value', (snap) => {
                    if (snap.val() != null) {
                      groupMember = snap.val();
                      if (groupMember) {
                        db.database().ref('Group').child(uid)
                          .once('value', (get) => {
                            if (get.val() != null) {
                              const userGroup = get.val();
                              // Get user details both new group and old ones
                              res.status(200).send({
                                message: 'Group Created Successfully',
                                groupMember,
                                group: groupName,
                                Groups: userGroup
                              });
                            }
                          });
                      }
                    }
                  });
              }
            });
        }
      }, ({ error }) => {
        res.send({ err: error });
      });
  });
// });

// ========================Get Groups=================//
Router.route('/getgroups')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // get user firebase Unique identification uid
        const uID = (firebase.auth().currentUser).uid;
        db.database().ref('Group').child(uID)
          .once('value', (snapshot) => {
            if (snapshot.val() != null) {
              const groupMembers = snapshot.val();
              // return grouplist members and success message
              res.send({ message: 'group members are here', groupMembers });
            }
          });
      });
  });

//  get member of a particular group
Router.route('/memberlist')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const groupName = req.body.group;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        const user = (firebase.auth().currentUser).uid;
        db.database().ref(`Group/${user}`).child(groupName)
          .once('value', (snapshot) => {
            if (snapshot.val() != null) {
              const member = snapshot.val();
              res.send({
                message: `Hey, here are members of the group ${groupName}`,
                member });
            } else {
              res.send({
                message: 'No data found'
              });
            }
          });
      });
  });


// //  ============================ADD MEMBER ENDPOINT=================//
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
        db.database().ref('Group').child(uSer)
          .once('value', (get) => {
            if (get.val() != null) {
              const userGroup = get.val();
              // Get user details both new group and old ones
              res.send({ message: 'Member added successfully', groupMember,
                group: groupName, Groups: userGroup });
            }
          });
      })
      .catch(() => {
        res.status(401).send({ message: 'Not authorized' });
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
        // delete user details from Groups and  user`s membership
        db.database().ref('users').child(userId).remove();
        db.database().ref('Group').child(userId).remove();
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
    const email = req.body.email;
    const password = req.body.password;
    const groupName = req.body.group;
    const message = req.body.message;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // convert all input groups to lowercase
        const group = groupName.toLowerCase();
        const userId = (firebase.auth().currentUser).uid;
        const groupRef = db.database().ref(`Group/${userId}`).child(group);
        groupRef.orderByKey().on('child_added', (data) => {
          // both date and time at which message is sent
          const date = (new Date()).toDateString();
          const time = (new Date()).toTimeString();
          groupRef.child(data.key).push({ message, date, time });
        });
        // get sentMessages and newly sent message
        db.database().ref(`Group/${userId}`).child(group)
          .once('value', (snapshot) => {
            if (snapshot.val() != null) {
              const sentMessages = snapshot.val();
              const newMess = message;
              // server response sentMessages and newly sent message
              res.send({ message: 'Broadcast Message sent successfully',
                sentMessages,
                newMess
              });
            } else {
              // send only server response and newly sent message
              const newMess = message;
              res.send({ message: 'Broadcast Message sent successfully',
                newMess
              });
            }
          });
      })
      // Catch error for non registered user
      .catch(() => {
        res.status(404).send({ message: 'User`s not registered' });
      });
  });

// export Router
export default Router;
