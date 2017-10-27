import values from 'object.values';
import dbConfig from '../config/dbConfig';

/**
 * @export
 * @class Helper
 */
export default class Helper {

  /**
   * @static
   * @param {string} password - validate password
   * @returns {boolean} true
   * @memberof Helper
   */
  static validatePassword(password) {
    if (
      password.match(/^(?=.*?[A-Za-z0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)) {
      return true;
    }
  }

  /**
   * @static
   * @param {string} phoneNumber - validate phoneNumber
   * @returns {boolean} true
   * @memberof Helper
   */
  static validatePhoneNumber(phoneNumber) {
    const matched = /^(\+234-|\+234|0)?\d{10}$/;
    if (phoneNumber.match(matched) && phoneNumber.length >= 11) {
      return true;
    }
  }

  /**
   * @static
   * @param {string} userId - get user phoneNumber and Email
   * @returns {Object} - object that contains user email and phoneNumber
   * @memberof Helper
   */
  static getUserEmailAndPhoneNumber(userId) {
    return new Promise(resolve => {
      dbConfig.database().ref('users').child(userId).on('value',
        snapshot => {
          if (snapshot.val()) {
            resolve(snapshot.val());
          }
          resolve({});
        });
    });
  }

  /**
   * @static
   * @param {string} groupId - Group Identity
   * @returns {Object} - Array of phoneNumbers in the group
   * @memberof Helper
   */
  static getGroupPhoneNumbers(groupId) {
    return new Promise(resolve => {
      dbConfig.database().ref('GroupPhoneAndEmail').child(groupId).on('value',
      snapshot => {
        if (snapshot.val()) {
          resolve(values(snapshot.val()));
        }
        resolve({});
      });
    });
  }

  /**
   * @static
   * @param {string} groupId - get the name of a group
   * @returns {Object} - Array of object
   * @memberof Helper
   */
  static getGroupName(groupId) {
    return new Promise(resolve => {
      dbConfig.database().ref('Groups').child(groupId).on('value',
      snapshot => {
        if (snapshot.val()) {
          resolve(values(snapshot.val()));
        }
        resolve({});
      });
    });
  }

  /**
   * @static
   * @param {Object} groupEmails - Array of Object of groupMembers Email
   * @returns {string} - String of group Emails
   * @memberof Helper
   */
  static getGroupEmails(groupEmails) {
    let emailIndex = 0;
    const emails = [];
    while (emailIndex < groupEmails.length) {
      emails.push(groupEmails[emailIndex].email);
      emailIndex++;
    }
    return emails.join();
  }

  /**
   * @static
   * @param {Object} groupPhoneNumbers - Array of PhoneNumbers
   * @returns {Object} -
   * @memberof Helper
   */
  static getPhoneNumbers(groupPhoneNumbers) {
    let phoneNumberIndex = 0;
    const phoneNumbers = [];
    while (phoneNumberIndex < groupPhoneNumbers.length) {
      phoneNumbers.push(groupPhoneNumbers[phoneNumberIndex].phoneNumber);
      phoneNumberIndex++;
    }
    return phoneNumbers;
  }

  /**
   * @static
   * @param {Object} user - Object of array of all registered Users
   * @returns {Object} - Array of all registered users
   * @memberof Helper
   */
  static getAllUsers(user) {
    const users = Object.values(user.response[0]);
    let index = 0;
    const allUsers = [];
    let registeredUser;
    while (index < users.length) {
      registeredUser = Object.values(users[index]);
      allUsers.push({ [registeredUser[0].userId]: registeredUser[0].userName });
      index++;
    }
    return allUsers;
  }
}
