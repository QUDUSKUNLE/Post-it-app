import axios from 'axios';
import toastr from 'toastr';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { SIGN_UP_SUCCESS } from '../constants/ActionConstants.js';

/**
 * @description - Sign Up Action
 * @param {object} user - { email,
     password, confirmPassword, phoneNumber, username }
 * @returns {function} Object -
 */
export const signupAction = user => axios.post('/api/v1/signup', user)
  .then(({ data }) => {
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
