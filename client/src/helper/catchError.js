import toastr from 'toastr';

/**
 * @description: This help to catch all error into one function
 * @param {Object} error request object
 * @return {string} toastr erros
 */
export default (error) => {
  if (error.response.data.error.code === 'Password should be at least 6' +
    ' characters with a speacial character') {
    toastr.error('Password should be at least 6' +
      ' characters with a speacial character');
  } else if (error.response.data.error.code === 'Password does not match') {
    toastr.error('Password does not match');
  } else if (error.response.data.error.code === 'Username required at least' +
  ' 2 characters') {
    toastr.error('Username required at least 2 characters');
  } else if (error.response.data.error.code === 'Incorrect phone number') {
    toastr.error('Incorrect phone number');
  } else if (error.response.data.error.code === 'Enter a valid phone Number') {
    toastr.error('Enter a valid phone Number');
  } else if (error.response.data.error.code === 'auth/email-already-in-use') {
    toastr.error(error.response.data.error.message);
  } else if (error.response.data.error.code === 'Email is badly formatted') {
    toastr.error('Email is badly formatted');
  } else if (error.response.data.error.code ===
    'Group name should be at least 3 characters') {
    toastr.error('Group name should be at least 3 characters');
  } else if (error.response.data.error.code === 'auth/user-not-found') {
    toastr.error('There is no user record corresponding to this identifier.' +
    ' The user may have been deleted.');
  } else if (error.response.data.error.code === 'auth/wrong-password') {
    toastr.error('Invalid password');
  } else if (error.response.data.error === 'Group already exists') {
    toastr.error('Group already exists');
  } else if (error.response.data.error === 'User`s already a member') {
    toastr.error('User`s already a member');
  } else if (error.response.data.error === 'No valid token provided') {
    return;
  }
};
