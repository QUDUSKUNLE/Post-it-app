import values from 'object.values';
import dbConfig from '../config/dbConfig';

/**
 * @export
 * @class Helper
 */
export default class Helper {

  /**
   * @static
   * @param {any} password
   * @returns
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
   * @param {any} phoneNumber
   * @returns
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
   * @param {any} userId
   * @returns
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
   * @param {any} groupId
   * @returns
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
   * @param {any} groupId
   * @returns
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
   * @param {any} groupEmails
   * @returns
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
   * @param {any} groupPhoneNumbers
   * @returns
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
   * @param {any} user
   * @returns
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
