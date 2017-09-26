/**
 * @function validatePassword
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
}
