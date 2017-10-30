import axios from 'axios';
import toastr from 'toastr';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { PASSWORD_RESET_SUCCESS } from '../constants/ActionConstants.js';

/**
 * @description - Reset Password Action
 * @param {object} email - { johndoe@example.cpm }
 * @returns {object} object
 */
const resetPassword = email => axios.post('/api/v1/passwordReset',
  email)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: PASSWORD_RESET_SUCCESS, response: data });
  }).catch(error => toastr.error(error.response.data.error.message));

export default resetPassword;
