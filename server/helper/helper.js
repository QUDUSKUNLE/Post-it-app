import values from 'object.values';
import dbConfig from '../config/dbConfig';

export const getUserEmailAndPhoneNumber = (userId) => Promise.all([
  dbConfig.database().ref('users').child(userId)
    .once('value', snapshot => snapshot.val())
]);

/**
 * @class Helper
 * @param {Object} password -
 * @returns {bool} validated
 */
export default class Helper {

  static validatePassword(password) {
    if (
      password.match(/^(?=.*?[A-Za-z0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)) {
      return true;
    }
  }

  static validatePhoneNumber(phoneNumber) {
    const matched = /^(\+234-|\+234|0)?\d{10}$/;
    if (phoneNumber.match(matched) && phoneNumber.length >= 11) {
      return true;
    }
  }

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

  static getGroupEmails(groupEmails) {
    let emailIndex = 0;
    const emails = [];
    while (emailIndex < groupEmails.length) {
      emails.push(groupEmails[emailIndex].email);
      emailIndex++;
    }
    return emails.join();
  }

  static getPhoneNumbers(groupPhoneNumbers) {
    let phoneNumberIndex = 0;
    const phoneNumbers = [];
    while (phoneNumberIndex < groupPhoneNumbers.length) {
      phoneNumbers.push(groupPhoneNumbers[phoneNumberIndex].phoneNumber);
      phoneNumberIndex++;
    }
    return phoneNumbers;
  }
}
