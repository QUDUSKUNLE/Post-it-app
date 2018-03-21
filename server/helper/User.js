
import capitalize from 'capitalize';
import dbConfig from '../config/dbConfig';


/**
 * @description This is a class User that contains methods that helps to
 *  query for user details
 * from firebase Database
 *
 * @class User
 */
export default class User {

  /**
   * @description This function helps get user details from database
   * @param {string} userId - user Identity
   * @returns {Object} - user details
   * @memberof User
   */
  static details(userId) {
    return new Promise((resolve) => {
      dbConfig.database().ref('users').child(userId).on('value',
        (snapshot) => {
          if (snapshot.val()) {
            resolve(snapshot.val());
          }
          resolve({});
        });
    });
  }

  /**
   * @description This function helps to check if a username exist
   * @param {string} userName - username
   * @returns {boolean} - true/false
   * @memberof User
   */
  static checkUser(userName) {
    const user = capitalize(userName);
    return new Promise((resolve) => {
      dbConfig.database().ref('users/').orderByChild('userName/')
        .startAt(user)
        .endAt(`${user}\uf8ff`)
        .once('value', (snapshot) => {
          let response;
          if (snapshot.val()) {
            response = true;
          } else {
            response = false;
          }
          resolve(response);
        });
    });
  }
}
