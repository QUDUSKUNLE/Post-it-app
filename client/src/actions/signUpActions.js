import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

import {
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR } from '../constants/ActionConstants.js';

/**
  * @description - Sign Up Action
  * @param {object} user - { email,
     password, confirmPassword, phoneNumber, username }
  * @returns {function} Object -
*/

export const signupAction = (user) => axios.post('/signup', user)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: SIGN_UP_SUCCESS,
      response: data
    });
  }).catch((error) => {
    if (error.response) {
      AppDispatcher.dispatch({
        type: SIGN_UP_ERROR,
        error: error.response
      });
    }
  });
