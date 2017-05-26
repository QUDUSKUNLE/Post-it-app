"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _firebase = require("firebase");

var _firebase2 = _interopRequireDefault(_firebase);

var _config = require("./config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();
//=================================Homepage Endpoint===================================================================//
// ====================================== Import Libraries=========================================================//
Router.route("/").get(function (req, res) {
    res.send('Welcome to PostIt-App');
});

//==================================Sign Up Endpoint=====================================================================//
Router.route("/user/signup").post(function (req, res) {
    var email = req.body.email,
        password = req.body.password,
        username = req.body.username;
    _firebase2.default.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
        _config2.default.database().ref("users").push({
            userEmail: email,
            UserPassword: password,
            userName: username
        });
        res.send({
            message: "Registration successful"
        });
    }).catch(function (error) {
        res.send({
            message: "error in Registration " + error.message
        });
    });
});

//============================================Sign in Endpoint======================================================//

Router.route("/user/signin").post(function (req, res) {
    var email = req.body.email,
        password = req.body.password;
    _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        res.send({
            message: "User Signed in successfully"
        });
    }).catch(function (error) {
        res.send({
            message: error.code + " " + error.message
        });
    });
});
// ===========================================Sign Out Endpoint===================================================//

Router.route("/user/signout").post(function (req, res) {
    _firebase2.default.auth().signOut().then(function () {
        res.send({
            message: "Sign-out successful."
        });
    }).catch(function (error) {
        res.send({
            message: "Try again"
        });
    });
});

//=====================================Create Group Endpoint=======================================================//

Router.route("/group").post(function (req, res) {
    var email = req.body.email,
        password = req.body.password,
        groupName = req.body.group;
    _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        _firebase2.default.auth().onAuthStateChanged(function (user) {
            var uSer = _firebase2.default.auth().currentUser,
                uid = uSer.uid;
            if (uSer !== null) {
                var group = groupName.toLowerCase();
                _config2.default.database().ref("Group").child(group).once("value", function (snapshot) {
                    if (snapshot.val() != null) {
                        res.json({ message: "Group already exists" });
                    } else {
                        _config2.default.database().ref("Group").child(group).push({
                            member: uid
                        });
                        res.send({ message: "Group Created Successfully" });
                    }
                });
            }
        });
    });
});

//=========================================ADD MEMBER ENDPOINT===============================================//

Router.route('/group/groupId/user').post(function (req, res) {
    var email = req.body.email,
        password = req.body.password,
        groupName = req.body.groupname,
        groupMember = req.body.user,
        groupId = req.body.groupId;

    _firebase2.default.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        var name = groupName.toLowerCase();
        _config2.default.database().ref("Group/" + name).push({
            member: groupMember
        });
        res.send({
            message: "Member added successfully"
        });
    }).catch(function (error) {
        res.send({
            message: "Ouch!!! Not an authenticated User"
        });
    });
});
exports.default = Router; // Export apiRouter