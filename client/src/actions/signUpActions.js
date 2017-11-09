import axios from 'axios';
import toastr from 'toastr';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { SIGN_UP_SUCCESS } from '../constants/ActionConstants';

/**
 * @description - An action that makes API call to server
 *  to sign up a new user
 * @param {object} user - This contain user`s details { email,
     password, confirmPassword, phoneNumber, username }
 * @returns {function} dispatch - server response is dispatch to SignUpStore
 */
const signUpAction = user => axios.post('/api/v1/signup', user)
  .then(({ data }) => {
    console.log(data);
    AppDispatcher.dispatch({
      type: SIGN_UP_SUCCESS,
      response: data
    });
  }).catch((error) => {
    if (error.response.data.error.code === 'password should be at least 6' +
      ' characters with a speacial character' ||
      error.response.data.error.code === 'Password does not match' ||
      error.response.data.error.code === 'Username required at' +
      ' least 2 characters' ||
      error.response.data.error.code === 'Incorrect phone number') {
      toastr.error(error.response.data.error.code);
    } else {
      toastr.error(error.response.data.error.message);
    }
  });

export default signUpAction;
