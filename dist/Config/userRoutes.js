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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();
//  ===================Homepage Endpoint=======================//
//  =================== Import Libraries=====================//
Router.route('/').get(function (req, res) {
    res.send('Welcome to PostIt-App');
});

//  ======================Sign Up Endpoint============//
Router.route('/user/signup').post(function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;
    _firebase2.default.auth().createUserWithEmailAndPassword(email, password).then(function () {
        _config2.default.database().ref('users').push({
            userEmail: email,
            UserPassword: password,
            userName: username
        });
        res.send({
            message: 'Registration successful'
        });
    }).catch(function () {
        res.status(502).send({
            message: 'Already registered'
        });
    });
});
//  ======================Sign in Endpoint===========================//

Router.route('/user/signin').post(function (req, res) {
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

Router.route('/user/signout').post(function (req, res) {
    _firebase2.default.auth().signOut().then(function () {
        res.send({
            message: 'Sign-out successful.'
        });
    }).catch(function () {
        res.send({
            message: 'Try again'
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
                _config2.default.database().ref('Group').child(group).once('value', function (snapshot) {
                    if (snapshot.val() != null) {
                        res.status(502).send({ message: 'Group already exists' });
                    } else {
                        _config2.default.database().ref('Group').child(group).push({
                            member: uid
                        });
                        res.send({ message: 'Group Created Successfully' });
                    }
                });
            }
        });
    }).catch(function () {
        res.status(401).send({
            message: 'User not registered'
        });
    });
});

//  ============================ADD MEMBER ENDPOINT=================//

Router.route('/group/groupId/user').post(function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var groupName = req.body.group;
    var groupMember = req.body.user;
    _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function () {
        var name = groupName.toLowerCase();
        _config2.default.database().ref('Group/' + name).push({
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

// Export apiRouter
exports.default = Router;