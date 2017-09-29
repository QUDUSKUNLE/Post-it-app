import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR } from '../constants/ActionConstants.js';

/**
 * @description - Reset Password Action
 * @param {object} email - { johndoe@example.cpm }
 * @returns {object} object
 */
export const resetPassword = (email) => axios.post('/passwordReset', email)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: PASSWORD_RESET_SUCCESS, response: data });
  }).catch((error) => {
    if (error.response) {
      AppDispatcher.dispatch({
        type: PASSWORD_RESET_ERROR,
        error: error.response.data
      });
    }
  });
