import firebase from 'firebase';
import moment from 'moment';
import dbConfig from '../config/dbConfig';
import Helper from '../helper/Helper';

/**
 * @description This class create and read functions for User
 * @class UserController
 */
export default class UserController {

  /**
   * @description This method signup a new user
   * route POST: api/v1/signup
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains signed up user response
   */
  static signUp(req, res) {
    const { email, password,
      confirmPassword, phoneNumber, username } = req.body;
    if (!Helper.validatePassword(password)) {
      res.status(403).send({
        error: { code:
          'password should be at least 6' +
        ' characters with a speacial character' }
      });
    } else if (username === undefined) {
      res.status(400).send({ error: { code:
        'Username is required' }
      });
    } else if (username.length < 2) {
      res.status(403).send({ error: { code: 'Username required at' +
      ' least 2 characters' }
    });
    } else if (password !== confirmPassword) {
      res.status(403).send({ error: { code:
        'Password does not match' }
      });
    } else if (!Helper.validatePhoneNumber(phoneNumber)) {
      res.status(400).send({ error: { code:
        'Incorrect phone number' } });
    } else {
      dbConfig.auth().createUserWithEmailAndPassword(email, password)
      .then(user => user.sendEmailVerification()
        .then(() => {
          const userUid = (firebase.auth().currentUser).uid;
          return Promise.all(
            [dbConfig.database().ref(`users/${userUid}`).push({
              userEmail: email,
              userName: username,
              phone_Number: phoneNumber,
              time: moment().format('llll'),
              userId: userUid
            })
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
          res.status(403).send({ error });
        } else {
          res.status(404).send({ error });
        }
      });
    }
  }


  /**
   * @description This method signin registered users
   * route POST: api/v1/signin
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains signed user details
   */
  static signIn(req, res) {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
      res.status(403).send({
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
   * @description This method sign in users via Google account
   * route POST: api/v1/googleSignIn
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains signed user details via Google
   */
  static googleSignIn(req, res) {
    const token = req.body.credential.idToken;
    const credentials = firebase.auth.GoogleAuthProvider.credential(token);
    firebase.auth().signInWithCredential(credentials)
      .then((user) => {
        dbConfig.database().ref('users').child(user.uid)
          .once('value', snapshot => {
            if (!snapshot.exists()) {
              Promise.all(
                [dbConfig.database().ref(`users/${user.uid}`).push({
                  userEmail: user.email,
                  userName: user.displayName,
                  phone_Number: '08092893120',
                  time: moment().format('llll'),
                  userId: user.uid
                }),
                user
              ])
               .then((response) => {
                 const responseValue = response[1];
                 res.status(200).send({
                   message: 'user`s signed in succesfully', responseValue });
               });
            } else {
              res.status(200).send({
                message: 'user`s signed in succesfully',
                user });
            }
          });
      })
      .catch((error) => {
        if (error) {
          res.status(501).send({ response: error.message });
        }
      });
  }

  /**
   * @description This method allow users reset their password
   * route POST: api/v1/passwordReset
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains reset password details
   */
  static passwordReset(req, res) {
    const { email } = req.body;
    firebase.auth().sendPasswordResetEmail(email).then(() =>
      res.status(200).send({ message: 'Password reset email sent successfully!'
      })).catch((error) => {
        if (error.code === 'auth/user-not-found') {
          res.status(404).send({ error });
        } else if (error.code === 'auth/invalid-email') {
          res.status(400).send({ error });
        }
      });
  }

  /**
   * @description This method signout users
   * route POST: api/v1/signout
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains sign out response
   */
  static signOut(req, res) {
    firebase.auth().signOut()
      .then(() => {
        req.user = {};
        res.status(200).send({ message: 'User`s signed-out successfully.' });
      })
      .catch(() => res.status(500).send({ message: 'Network Error' }));
  }
}
