/**
 * @description This is a class Helper that contains functions that helps to
 * validate password, validate phoneNumber, help to destructure Object of arrays
 * from firebase Database
 *
 * @class DestructureFirebaseData
 */
export default class DestructureFirebaseData {

  /**
   * @description This function helps to pull out Emails of Users in a group
   * @param {Object} groupEmails - Array of Object of groupMembers Email
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
   * @param {Object} groupPhoneNumbers - Array of PhoneNumbers
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
      index += 1;
    }
    return allUsers;
  }
}
