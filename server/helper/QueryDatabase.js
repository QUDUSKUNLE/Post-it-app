import values from 'object.values';
import dbConfig from '../config/dbConfig';


/**
 * @description This is a class Helper that contains functions that helps to
 * validate password, validate phoneNumber, help to destructure Object of arrays
 * from firebase Database
 *
 * @class QueryDatabase
 */
export default class QueryDatabase {

  /**
   * @description This function helps pull out user`s email and phoneNumber
   * from Firebase database
   *
   * @param {string} userId - get user phoneNumber and Email
   *
   * @returns {Object} - object that contains user email and phoneNumber
   * @memberof QueryDatabase
   */
  static getUserEmailAndPhoneNumber(userId) {
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
   * @description This function helps to get phoneNumbers and Emails of Users in
   * in a group
   * @param {string} groupId - Group Identity
   * @returns {Object} - Array of phoneNumbers in the group
   * @memberof QueryDatabase
   */
  static getGroupPhoneNumbers(groupId) {
    return new Promise((resolve) => {
      dbConfig.database().ref('GroupPhoneAndEmail').child(groupId).on('value',
      (snapshot) => {
        if (snapshot.val()) {
          resolve(values(snapshot.val()));
        }
        resolve({});
      });
    });
  }

  /**
   * @description This function helps to get name of a group
   * @param {string} groupId - get the name of a group
   * @returns {Object} - Array of object
   * @memberof QueryDatabase
   */
  static getGroupName(groupId) {
    return new Promise((resolve) => {
      dbConfig.database().ref('Groups').child(groupId).on('value',
        (snapshot) => {
          if (snapshot.val()) {
            resolve(values(snapshot.val()));
          }
          resolve({});
        });
    });
  }
}
