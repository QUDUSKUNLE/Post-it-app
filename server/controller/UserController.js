import firebase from 'firebase';
import moment from 'moment';
import sendToken from '../utils/sendToken';
import dbConfig from '../config/dbConfig';

/**
 * @description This class create and read functions for User
 * @class UserController
 */
export default class UserController {

  /**
   * @description This method signup a new user
   * route POST: api/v1/signup
   *
   * @param {Object} req request object
   * @param {Object} res response object
   *
   * @return {Object} json response contains signed up user response
   */
  static signUp(req, res) {
    const { email, password, phoneNumber, username } = req.body;
    dbConfig.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const userToken = sendToken(user.uid, email);
        return Promise.all(
          [dbConfig.database().ref(`users/${user.uid}`).push({
            userEmail: email,
            userName: username,
            phone_Number: phoneNumber,
            time: moment().format('llll'),
            userId: user.uid
          }),
          { token: userToken }
          ]);
      }).then(response => res.status(201).send({
        message: 'User`s sign up successfully', response }))
      .catch(error => res.status(409).send({ error }));
  }

  /**
   * @description This method signin registered users
   * route POST: api/v1/signin
   *
   * @param {Object} req request object
   * @param {Object} res response object
   *
   * @return {Object} json response contains signed user details
   */
  static signIn(req, res) {
    const { email, password } = req.body;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        const token = sendToken(user.uid, email);
        res.status(200).send({
          message: 'User Signed in successfully', token });
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          res.status(400).send({ error });
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
    const idToken = req.body.credential.idToken;
    const credentials = firebase.auth.GoogleAuthProvider.credential(idToken);
    firebase.auth().signInWithCredential(credentials)
      .then((user) => {
        dbConfig.database().ref('users').child(user.uid)
          .once('value', (snapshot) => {
            if (!snapshot.exists()) {
              const userToken = sendToken(user.uid, user.email);
              Promise.all(
                [dbConfig.database().ref(`users/${user.uid}`).push({
                  userEmail: user.email,
                  userName: user.displayName,
                  phone_Number: '08092893120',
                  time: moment().format('llll'),
                  userId: user.uid
                }),
                { token: userToken }
                ])
                .then((response) => {
                  const responseValue = response[1];
                  res.status(200).send({
                    message: 'user`s signed in succesfully', responseValue
                  });
                });
            } else {
              const userToken = sendToken(user.uid, user.email);
              res.status(200).send({
                message: 'user`s signed in succesfully', token: userToken
              });
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
    firebase.auth().sendPasswordResetEmail(email)
    .then(() =>
      res.status(201).send({
        message: 'Password reset email sent successfully!'
      })).catch(error => res.status(404).send({ error }));
  }

  /**
   * @description This method allow users reset their password
   * route POST: api/v1/search?:user
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains reset password details
   */
  static searchUser(req, res) {
    const userName = req.query.user;
    const user = {};
    dbConfig.database().ref('users/').orderByChild('userName/')
      .startAt(userName)
      .endAt(`${userName}\uf8ff`)
      .once('value', (msg) => {
        console.log(msg.val());
        if (msg.val()) {
          console.log(msg.key);
          Object.keys(msg.val()).forEach(() => {
            user.email = (Object.values(msg.val())[0]).email;
            user.userName = (Object.values(msg.val())[0]).userName;
            user.userId = (Object.keys(msg.val()))[0];
          });
          return res.status(200).json({ user });
        }
        return res.status(404).send({
          message: 'No user found'
        });
      });
  }

  /**
   * @description This method signout users
   * route POST: api/v1/signout
   *
   * @param {Object} req request object
   * @param {Object} res response object
   *
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
