import axios from 'axios';
import catchError from '../helper/catchError';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { PASSWORD_RESET_SUCCESS } from '../constants/ActionConstants';

/**
 * @description - An action that makes API call to server
 *  to reset user`s password
 * @param {string} email - This represents email of the user
 * @returns {fucntion} dispatch - server response is dispatch to SignInStore
 */
const resetPasswordAction = email => axios.post('/api/v1/passwordReset',
  email)
  .then(({ res }) => {
    AppDispatcher.dispatch({
      type: PASSWORD_RESET_SUCCESS, response: res });
  }).catch(error => catchError(error));

export default resetPasswordAction;
