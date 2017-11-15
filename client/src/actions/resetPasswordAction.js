import axios from 'axios';
import catchError from '../helper/catchError';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { PASSWORD_RESET_SUCCESS } from '../constants/ActionConstants.js';

/**
 * @description - An action that makes API call to server
 *  to reset user`s password
 * @param {string} email - This represents email of the user
 * @returns {fucntion} dispatch - server response is dispatch to SignInStore
 */
const resetPasswordAction = email => axios.post('/api/v1/passwordReset',
  email)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: PASSWORD_RESET_SUCCESS, response: data });
  }).catch(error => catchError(error));

export default resetPasswordAction;
