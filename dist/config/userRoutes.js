'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// =================== Import Libraries =====================//
var Router = _express2.default.Router();

//  ===================Homepage Endpoint=======================//
Router.route('/*').get(function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../client/src/index.html'));
});

//   //  ======================Sign Up Endpoint============//
Router.route('/signup').post(function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var username = req.body.username;
  _firebase2.default.auth().createUserWithEmailAndPassword(email, password).then(function () {
    var user = _firebase2.default.auth().currentUser;
    var userId = user.uid;
    user.sendEmailVerification().then(function () {
      _config2.default.database().ref('users/' + userId).push({
        userEmail: email,
        userPassword: password,
        userName: username,
        date: new Date().toDateString(),
        time: new Date().toTimeString()
      });
      _config2.default.database().ref('Group').child('general' + userId).push({
        user: username,
        userID: userId,
        date: new Date().toDateString(),
        time: new Date().toTimeString()
      });
      res.send({
        message: 'Registration successful and ' + 'verification email sent to your email',
        data: {
          email: email,
          password: password,
          username: username,
          userId: userId
        }
      });
    }).catch(function () {
      res.status(404).send({
        message: 'Network Error'
      });
    });
  }).catch(function (error) {
    res.status(502).send({
      message: error,
      data: 'error signing in user`s'
    });
  });
});
//  ======================Sign in Endpoint===========================//
Router.route('/signin').post(function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function () {
    var uID = _firebase2.default.auth().currentUser.uid;
    _config2.default.database().ref('users').child(uID).once('value', function (snapshot) {
      if (snapshot.val() != null) {
        var userDetail = snapshot.val();
        _config2.default.database().ref('Group').child('general').once('value', function (groups) {
          if (groups.val() != null) {
            var userGroups = groups.val();
            res.send({
              message: 'User Signed in successfully',
              data: {
                uID: uID,
                userDetail: userDetail,
                userGroups: userGroups
              }
            });
          } else {
            // userDetails
            res.send({
              message: 'User Signed in successfully',
              data: {
                uID: uID,
                userDetail: userDetail
              }
            });
          }
        });
      }
    });
  }).catch(function (error) {
    res.status(404).send({
      err: error
    });
  });
});

//  ======================Sign Out Endpoint========================//
Router.route('/signout').post(function (req, res) {
  _firebase2.default.auth().signOut().then(function () {
    res.send({
      message: 'User`s signed-out successfully.'
    });
  }).catch(function () {
    res.status(404).send({
      message: 'Network Error'
    });
  });
});

// // //  ==========================Password Reset ==================//
Router.route('/passwordreset').post(function (req, res) {
  var email = req.body.email;
  _firebase2.default.auth().sendPasswordResetEmail(email).then(function () {
    res.send({
      message: 'Password reset email sent successfully!'
    });
  }).catch(function (err) {
    res.status(404).send({
      message: err.code
    });
  });
});

//  ===============Create Group Endpoint======================//
Router.route('/creategroup').post(function (req, res) {
  var groupMember = void 0;
  var email = req.body.email;
  var password = req.body.password;
  var groupName = req.body.group;
  _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function () {
    var user = _firebase2.default.auth().currentUser;
    var uid = user.uid;
    if (user) {
      var group = groupName.toLowerCase();
      _config2.default.database().ref('Group/' + uid).child(group).once('value', function (snapshot) {
        if (snapshot.val() != null) {
          groupMember = snapshot.val();
          // if current group already exists, output group members and
          // group name
          res.status(502).send({
            message: 'Group already exists',
            groupMember: groupMember,
            group: groupName
          });
        } else {
          _config2.default.database().ref('Group/' + uid).child(group).push({
            member: uid
          });
          _config2.default.database().ref('Group/' + uid).child(group).once('value', function (snap) {
            if (snap.val() != null) {
              groupMember = snap.val();
              if (groupMember) {
                _config2.default.database().ref('Group').child(uid).once('value', function (get) {
                  if (get.val() != null) {
                    var userGroup = get.val();
                    // Get user details both new group and old ones
                    res.status(200).send({
                      message: 'Group Created Successfully',
                      groupMember: groupMember,
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
  }, function (_ref) {
    var error = _ref.error;

    res.send({ err: error });
  });
});
// });

// ========================Get Groups=================//
Router.route('/getgroups').post(function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function () {
    // get user firebase Unique identification uid
    var uID = _firebase2.default.auth().currentUser.uid;
    _config2.default.database().ref('Group').child(uID).once('value', function (snapshot) {
      if (snapshot.val() != null) {
        var groupMembers = snapshot.val();
        // return grouplist members and success message
        res.send({ message: 'group members are here', groupMembers: groupMembers });
      }
    });
  });
});

//  get member of a particular group
Router.route('/memberlist').post(function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var groupName = req.body.group;
  _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function () {
    var user = _firebase2.default.auth().currentUser.uid;
    _config2.default.database().ref('Group/' + user).child(groupName).once('value', function (snapshot) {
      if (snapshot.val() != null) {
        var member = snapshot.val();
        res.send({
          message: 'Hey, here are members of the group ' + groupName,
          member: member });
      } else {
        res.send({
          message: 'No data found'
        });
      }
    });
  });
});

// //  ============================ADD MEMBER ENDPOINT=================//

Router.route('/group/member').post(function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var groupName = req.body.group;
  var groupMember = req.body.member;
  _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function () {
    var uSer = _firebase2.default.auth().currentUser.uid;
    var name = groupName.toLowerCase();
    _config2.default.database().ref('Group/' + uSer).child(name).push({
      member: groupMember
    });
    _config2.default.database().ref('Group').child(uSer).once('value', function (get) {
      if (get.val() != null) {
        var userGroup = get.val();
        // Get user details both new group and old ones
        res.send({ message: 'Member added successfully', groupMember: groupMember,
          group: groupName, Groups: userGroup });
      }
    });
  }).catch(function () {
    res.status(401).send({ message: 'Not authorized' });
  });
});
//	===============Delete a user`s Account=============//

Router.route('/delete').post(function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function () {
    var user = _firebase2.default.auth().currentUser;
    var userId = user.uid;
    // delete user details from Groups and  user`s membership
    _config2.default.database().ref('users').child(userId).remove();
    _config2.default.database().ref('Group').child(userId).remove();
    user.delete().then(function () {
      // Server response for successfully delete account
      res.send({ message: 'User`s deleted successfully' });
    })
    // Catch error for network error
    .catch(function () {
      res.status(404).send({ message: 'Network Error' });
    });
  })
  // Catch for non registered user
  .catch(function (err) {
    res.status(404).send({ message: err });
  });
});

// ================Message===============//

Router.route('/groupName/message').post(function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var groupName = req.body.group;
  var message = req.body.message;
  _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function () {
    // convert all input groups to lowercase
    var group = groupName.toLowerCase();
    var userId = _firebase2.default.auth().currentUser.uid;
    var groupRef = _config2.default.database().ref('Group/' + userId).child(group);
    groupRef.orderByKey().on('child_added', function (data) {
      // both date and time at which message is sent
      var date = new Date().toDateString();
      var time = new Date().toTimeString();
      groupRef.child(data.key).push({ message: message, date: date, time: time });
    });
    // get sentMessages and newly sent message
    _config2.default.database().ref('Group/' + userId).child(group).once('value', function (snapshot) {
      if (snapshot.val() != null) {
        var sentMessages = snapshot.val();
        var newMess = message;
        // server response sentMessages and newly sent message
        res.send({ message: 'Broadcast Message sent successfully',
          sentMessages: sentMessages,
          newMess: newMess
        });
      } else {
        // send only server response and newly sent message
        var _newMess = message;
        res.send({ message: 'Broadcast Message sent successfully',
          newMess: _newMess
        });
      }
    });
  })
  // Catch error for non registered user
  .catch(function () {
    res.status(404).send({ message: 'User`s not registered' });
  });
});

// export Router
exports.default = Router;