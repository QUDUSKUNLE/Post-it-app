import values from 'object.values';
import dbConfig from '../config/dbConfig';


/**
 * @description This is a class Group that contains methods that helps to
 * query database for group details
 *
 * @class Group
 */
export default class Group {
  /**
   * @description This function helps to get phoneNumbers and Emails
   * of users in a group
   * @param {string} groupId - Group Identity
   * @returns {Array} - Array of phoneNumbers in the group
   * @memberof Group
   */
  static emailPhoneNumbers(groupId) {
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
   * @param {string} groupId - group Identity
   * @returns {Object} - name of a group
   * @memberof Group
   */
  static name(groupId) {
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
