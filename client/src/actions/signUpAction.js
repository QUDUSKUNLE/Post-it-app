import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { SIGN_UP_SUCCESS } from '../constants/ActionConstants';
import catchError from '../helper/catchError';

/**
 * @description - An action that makes API call to server
 *  to sign up a new user
 * @param {object} user - This contain user`s details { email,
     password, confirmPassword, phoneNumber, username }
 * @returns {function} dispatch - server response is dispatch to SignUpStore
 */
const signUpAction = user => axios.post('/api/v1/signup', user)
  .then(({ res }) => {
    AppDispatcher.dispatch({
      type: SIGN_UP_SUCCESS,
      response: res
    });
  }).catch(error => catchError(error));

export default signUpAction;
