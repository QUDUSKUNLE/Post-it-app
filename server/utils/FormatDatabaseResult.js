/**
 * @description This is a class FormatDatabaseResult that contains
 * methodss that helps to formatDatabaseResult
 *
 * @class FormatDatabaseResult
 */
export default class FormatDatabaseResult {

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
   * @description This function help to formatSearchResult of users
   * before adding member to a group
   * @param {Object} searchResult - Object of search result
   * @returns {Object} -
   * @memberof Helper
   */
  static searchResult(searchResult) {
    const search = Object.values((searchResult));
    const searchValue = search.map(user =>
      ({ userName: user.userName, userId: user.userId }));
    return searchValue;
  }

}
