import firebase from 'firebase';
import moment from 'moment';
import capitalize from 'capitalize';
import generateToken from '../utils/generateToken';
import dbConfig from '../config/dbConfig';
import FormatDatabaseResult from '../utils/FormatDatabaseResult';
import User from '../helper/User';
import 'babel-polyfill';

/**
 * @description This class create and read functions for User
 * @class UserController
 */
export default class UserController {

  /**
   * @description This method allow users to search users
   * route POST: api/v1/checkuser
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains reset password details
   */
  static checkUser(req, res) {
    const { userName } = req.body;
    const normalizeName = capitalize(userName);
    dbConfig.database().ref('users/').orderByChild('userName/')
      .startAt(normalizeName)
      .endAt(`${normalizeName}\uf8ff`)
      .once('value', (snapshot) => {
        let response;
        if (snapshot.val()) {
          response = true;
        } else {
          response = false;
        }
        return res.status(200).send({ response });
      });
  }

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
      phoneNumber, confirmPassword,
      username } = req.body;
    if (password !== confirmPassword) {
      res.status(400).send({ error: { code: 'Password did not match' } });
    } else {
      const normalizeName = capitalize(username);
      User.checkUser(normalizeName).then((userStatus) => {
        if (userStatus === true) {
          res.status(409).send({ error:
            { code: 'Username already exist!' } });
        } else {
          dbConfig.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
              dbConfig.database().ref(`users/${user.uid}`).set({
                userEmail: email,
                userName: normalizeName,
                phone_Number: phoneNumber,
                time: moment().format('llll'),
                userId: user.uid
              });
              return { token: generateToken(user.uid, email) };
            }).then(response => res.status(201).send({
              message: 'User`s sign up successfully', response }))
            .catch(error => res.status(422).send({ error }));
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
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        const token = generateToken(user.uid, email);
        res.status(200).send({
          message: 'User Signed in successfully', token });
      })
      .catch(error => res.status(401).send({ error }));
  }

  /**
   * @description This method sign in users via Google account
   * route POST: api/v1/googleSignIn
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains signed user details via Google
   */
  static googleSignIn(req, res) {
    const { idToken } = req.body.credential;
    const credentials = firebase.auth.GoogleAuthProvider.credential(idToken);
    firebase.auth().signInWithCredential(credentials)
      .then((user) => {
        dbConfig.database().ref('users').child(user.uid)
          .once('value', (snapshot) => {
            if (!snapshot.exists()) {
              const normalizeName = capitalize(user.displayName);
              dbConfig.database().ref(`users/${user.uid}`).set({
                userEmail: user.email,
                userName: normalizeName,
                phone_Number: '08092893120',
                time: moment().format('llll'),
                userId: user.uid
              });
              return res.status(200).send({
                message: 'user`s signed in succesfully',
                token: generateToken(user.uid, user.email)
              });
            }
            return res.status(200).send({
              message: 'user`s signed in succesfully',
              token: generateToken(user.uid, user.email)
            });
          });
      })
      .catch(error => res.status(500).send({ error: error.response }));
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
    firebase.auth().sendPasswordResetEmail(email)
    .then(() =>
      res.status(200).send({
        message: 'Password reset email sent successfully!'
      })).catch(error => res.status(401).send({ error }));
  }

  /**
   * @description This method allow users to search users
   * route POST: api/v1/search?:user
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains reset password details
   */
  static searchUser(req, res) {
    const { keyword } = req.body;
    const normalizeName = capitalize(keyword);
    dbConfig.database().ref('users/').orderByChild('userName/')
      .startAt(normalizeName)
      .endAt(`${normalizeName}\uf8ff`)
      .limitToFirst(10)
      .once('value', (snapshot) => {
        let response;
        if (snapshot.val()) {
          response = FormatDatabaseResult.searchResult(snapshot.val());
        } else {
          response = [{ userName: 'No user Found', userId: 'No user Found' }];
        }
        return res.status(200).send({ response });
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
        res.status(200).send({ message: 'User`s signed-out successfully.' });
      })
      .catch(() => res.status(500).send({ error: 'Internal server error' }));
  }
}
