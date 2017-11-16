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
}
