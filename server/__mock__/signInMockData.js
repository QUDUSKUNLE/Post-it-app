export default {

  // signIn MockData
  wrongPassword: {
    email: 'Kemi@gmail.com',
    password: 'Ka123@#'
  },

  withoutEmail: {
    email: '',
    password: 'kawthar@'
  },

  badEmail: {
    email: 'kunle.com',
    password: 'kawthar@'
  },

  withoutPassword: {
    email: 'kunle@gmail.com',
    password: ''
  },

  withWrongDetails: {
    email: 'kawthath@gmail.com',
    password: 'kawthar1'
  },

  withCorrectDetails: {
    email: 'kunle@gmail.com',
    password: 'Ka123@',
  },

  // resetPassword MockData
  resetPasswordWithoutEmail: {
    email: ''
  },

  resetPasswordWithBadEmail: {
    email: 'kunle@.com'
  },

  resetPasswordWithCorrectEmail: {
    email: 'sasil@gmail.com'
  },

  notExistingEmail: {
    email: 'user@gmail.com'
  }
};
