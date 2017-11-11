import values from 'object.values';

import dbConfig from '../config/index.js';

/**
 * @description This is a class Helper that contains functions that helps to
 * validate password, valiadte phoneNumber, help to destructure Object of arrays
 * from firebase Database
 *
 * @class Helper
 */
export default class Helper {

  /**
   * @description This function validates user`s password
   *
   * @param {string} password - validate password
   *
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
   * @description This function helps pull out user`s email and phoneNumber
   * from Firebase database
   *
   * @param {string} userId - get user phoneNumber and Email
   *
   * @returns {Object} - object that contains user email and phoneNumber
   * @memberof Helper
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
   *
   * @param {string} groupId - Group Identity
   *
   * @returns {Object} - Array of phoneNumbers in the group
   * @memberof Helper
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
   *
   * @param {string} groupId - get the name of a group
   *
   * @returns {Object} - Array of object
   * @memberof Helper
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

  /**
   * @description This function helps to pull out Emails of Users in a group
   *
   * @param {Object} groupEmails - Array of Object of groupMembers Email
   *
   * @returns {string} - String of group Emails
   * @memberof Helper
   */
  static getGroupEmails(groupEmails) {
    let emailIndex = 0;
    const emails = [];
    while (emailIndex < groupEmails.length) {
      emails.push(groupEmails[emailIndex].email);
      emailIndex += 1;
    }
    return emails.join();
  }

  /**
   * @description This function help to extract phoneNumber of users in a group
   *
   * @param {Object} groupPhoneNumbers - Array of PhoneNumbers
   *
   * @returns {Object} -
   * @memberof Helper
   */
  static getPhoneNumbers(groupPhoneNumbers) {
    let phoneNumberIndex = 0;
    const phoneNumbers = [];
    while (phoneNumberIndex < groupPhoneNumbers.length) {
      phoneNumbers.push(groupPhoneNumbers[phoneNumberIndex].phoneNumber);
      phoneNumberIndex += 1;
    }
    return phoneNumbers;
  }

  /**
   * @description This function help to get Array of object of all Users
   *
   * @param {Object} user - Object of array of all registered Users
   *
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
      index += 1;
    }
    return allUsers;
  }
}
