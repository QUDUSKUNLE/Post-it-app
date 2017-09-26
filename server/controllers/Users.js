import firebase from 'firebase';
import moment from 'moment';
import path from 'path';
import dbConfig from '../config/dbConfig.js';
import Helper from '../helper/helper';

/**
* class Users: controls all Users routes
* @class Users
*/
export default class User {

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} response containing homepage
  */
  static home(req, res) {
    res.sendFile(path.join(__dirname, '../../client/src/index.html'));
  }

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} contains server signup response
  */
  static signUp(req, res) {
    const { email, password, confirmPassword, username } = req.body;
    if (!Helper.validatePassword(password)) {
      res.status(501).send({
        error: { code:
          'password should be at least 6' +
        ' characters with a speacial character' }
      });
    } else if (username === undefined) {
      res.status(501).send({ error: { code:
        'Username is required' }
      });
    } else if (username.length < 2) {
      res.status(501).send({ error: { code: 'Username required at' +
      ' least 2 characters' }
    });
    } else if (password !== confirmPassword) {
      res.status(501).send({ error: { code:
        'Password does not match' }
      });
    } else {
      dbConfig.auth().createUserWithEmailAndPassword(email, password)
      .then(user => user.sendEmailVerification()
        .then(() => {
          const userId = (firebase.auth().currentUser).uid;
          return Promise.all(
            [dbConfig.database().ref(`users/${userId}`).push({
              userEmail: email,
              userName: username,
              time: moment().format('llll')
            }),
            dbConfig.database().ref('Group/general/member')
              .child(`${userId}`).push({
                user: username,
                time: moment().format('llll')
              }),
            userId
            ]);
        })
        .then(response => res.status(200).send({
          message: 'Registration successful and ' +
          'verification email sent to your email', response })
        ))
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          res.status(400).send({ error });
        } else if (error.code === 'auth/email-already-in-use') {
          res.status(501).send({ error });
        } else {
          res.status(404).send({ error });
        }
      });
    }
  }

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} contains server signin response
  */
  static signIn(req, res) {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
      res.status(404).send({
        error: { code: 'Either email or passowrd is not provided' }
      });
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => Promise.all(
        [
          dbConfig.database().ref('users').child(user.uid)
            .once('value', (snapshot) => {
              if (!snapshot.val()) {
                snapshot.val();
              }
            })
        ]))
      .then(response => res.status(200).send({
        message: 'User Signed in successfully', response }))
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          res.status(400).send({ error });
        } else if (error.code === 'auth/wrong-password') {
          res.status(401).send({ error });
        } else if (error.code === 'auth/user-not-found') {
          res.status(404).send({ error });
        }
      });
    }
  }

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} contains server signin response
  */
  static googleSignIn(req, res) {
    const token = req.body.credential.idToken;
    const credentials = firebase.auth.GoogleAuthProvider.credential(token);
    firebase.auth().signInWithCredential(credentials)
      .then(user => res.status(200).send({
        message: 'user`s signed in succesfully',
        user
      }))
      .catch(error => res.status(501).send({ response: error.message }));
  }

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} contains server passwordReset response
  */
  static passwordReset(req, res) {
    const { email } = req.body;
    firebase.auth().sendPasswordResetEmail(email).then(() =>
      res.status(200).send({ message: 'Password reset email sent successfully!'
      })).catch(error => {
        if (error.code === 'auth/user-not-found') {
          res.status(404).send({ error });
        } else if (error.code === 'auth/invalid-email') {
          res.status(400).send({ error });
        }
      });
  }

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} contains server signOut response
  */
  static signOut(req, res) {
    firebase.auth().signOut()
      .then(() => {
        req.user = {};
        res.status(200).send({ message: 'User`s signed-out successfully.' });
      })
      .catch(() => res.status(404).send({ message: 'Network Error' }));
  }
}
