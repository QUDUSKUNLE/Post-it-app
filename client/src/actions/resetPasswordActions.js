import axios from 'axios';
import toastr from 'toastr';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { PASSWORD_RESET_SUCCESS } from '../constants/ActionConstants.js';

/**
 * @description - An action that makes API call to server
 *  to reset user`s password
 * @param {string} email - This represents email of the user
 * @returns {fucntion} dispatch - server response is dispatch to SignInStore
 */
const resetPassword = email => axios.post('/api/v1/passwordReset',
  email)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: PASSWORD_RESET_SUCCESS, response: data });
  }).catch(error => toastr.error(error.response.data.error.message));

export default resetPassword;
