import firebase from 'firebase';
import moment from 'moment';
import dbConfig from '../config/index';
import admin from '../firebaseSDK/firebaseConfiguration';
import Helper from '../helper/helper';

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
    const {
      email, password,
      confirmPassword,
      phoneNumber, username } = req.body;
    const userEmail = email;
    const userPassword = password;
    const userPhoneNumber = '+234' + phoneNumber;
    const userDisplayName = username;
    const signUpDetails = {
      email: userEmail,
      phoneNumber: userPhoneNumber,
      password: userPassword,
      displayName: userDisplayName
    };
    admin.auth().createUser(signUpDetails)
      .then(userRecord => {
        const userUid = userRecord.uid;
        admin.database().ref(`users/${userUid}`).push({
          userEmail: userEmail,
          userName: userDisplayName,
          phone_Number: userPhoneNumber,
          time: moment().format('llll'),
          userId: userUid
        });
        res.status(200).send({
          message: 'User`s signed up successfully', userRecord });
      }).catch(error => res.status(401).send({ error }));
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
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => res.status(200).send({
        message: 'User Signed in successfully', user }))
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          res.status(400).send({ error });
        } else if (error.code === 'auth/wrong-password') {
          res.status(401).send({ error });
        } else if (error.code === 'auth/user-not-found') {
          res.status(404).send({ error });
        }
      });
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
    admin.auth().verifyIdToken(idToken)
      .then((decodedToken) => {
        admin.database().ref('users').child(decodedToken.uid)
          .once('value', (snapshot) => {
            if (!snapshot.exists()) {
              Promise.all(
                [admin.database().ref(`users/${decodedToken.uid}`).push({
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
                message: 'user`s signed in succesfully', user });
            }
          });
      })
      .catch(error => res.status(501).send({ response: error.message }) );
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
