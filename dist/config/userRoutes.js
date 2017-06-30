'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  =================== Import Libraries=====================//
var Router = _express2.default.Router();

//  ===================Homepage Endpoint=======================//
Router.route('/*').get(function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../client/src/index.html'));
});
//  ======================Sign Up Endpoint============//

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
        UserPassword: password,
        userName: username
      });
      res.send({
        message: 'Registration successful and ' + 'verification email sent to your email'
      });
    }).catch(function () {
      res.status(404).send({
        message: 'Network Error'
      });
    });
  }).catch(function () {
    res.status(502).send({
      message: 'Already registered'
    });
  });
});
//  ======================Sign in Endpoint===========================//
Router.route('/signin').post(function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function () {
    res.send({
      message: 'User Signed in successfully'
    });
  }).catch(function () {
    res.status(404).send({
      message: 'Not Found'
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

//  ===============Create Group Endpoint======================//
Router.route('/group').post(function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var groupName = req.body.group;
  _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function () {
    _firebase2.default.auth().onAuthStateChanged(function () {
      var uSer = _firebase2.default.auth().currentUser;
      var uid = uSer.uid;
      if (uSer !== null) {
        var group = groupName.toLowerCase();
        _config2.default.database().ref('Group/' + uid).child(group).once('value', function (snapshot) {
          if (snapshot.val() != null) {
            res.status(502).send({ message: 'Group already exists' });
          } else {
            _config2.default.database().ref('Group/' + uid).child(group).push({
              member: uid
            });
            res.send({ message: 'Group Created Successfully' });
          }
        });
      }
    });
  }).catch(function () {
    res.status(401).send({
      message: 'User`s not registered'
    });
  });
});

//  ============================ADD MEMBER ENDPOINT=================//
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
    res.send({
      message: 'Member added successfully'
    });
  }).catch(function () {
    res.status(401).send({
      message: 'Not authorized'
    });
  });
});

//	===============Delete a user`s Account============
Router.route('/delete').post(function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function () {
    var user = _firebase2.default.auth().currentUser;
    var userId = user.uid;
    _config2.default.database().ref('users/' + userId).remove();
    user.delete().then(function () {
      res.send({
        message: 'User`s deleted successfully '
      });
    }).catch(function () {
      res.status(404).send({
        message: 'Network Error'
      });
    });
  }).catch(function () {
    res.status(404).send({
      message: 'User`s not Found'
    });
  });
});

Router.route('/groupName/message').post(function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var groupName = req.body.group;
  var mess = req.body.message;
  _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function () {
    var group = groupName.toLowerCase();
    var userId = _firebase2.default.auth().currentUser.uid;
    var groupRef = _config2.default.database().ref('Group/' + userId).child(group);
    groupRef.orderByKey().on('child_added', function (data) {
      groupRef.child(data.key).push({
        message: mess
      });
    });
    res.send({
      message: 'Broadcast Message sent successfully'
    });
  }).catch(function () {
    res.status(404).send({
      message: 'User`s not registered'
    });
  });
});

// Export apiRouter
exports.default = Router;