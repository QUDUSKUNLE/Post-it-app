/**
 * @class Helper
 * @param {Object} password -
 * @returns {bool} validated
 */
export default class Helper {

  static validatePassword(password) {
    if (
    password.match(/^(?=.*?[A-Za-z0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)
      ) {
      return true;
    }
  }

  static validatePhoneNumber(phoneNumber) {
    const matched = /^(\+234-|\+234|0)?\d{10}$/;
    if (phoneNumber.match(matched) && phoneNumber.length >= 11) {
      return true;
    }
  }
}
