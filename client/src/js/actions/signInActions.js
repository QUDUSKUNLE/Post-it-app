import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR } from '../constants/ActionConstants.js';

/**
  * @description - Sign in Action
  * @param {object} user - { email, password }
  * @returns {Object} Object
*/

export const signinAction = (user) => axios.post('/signin', user)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: SIGN_IN_SUCCESS,
      response: data
    });
  }).catch((error) => {
    if (error.response) {
      AppDispatcher.dispatch({
        type: SIGN_IN_ERROR,
        error: error.response
      });
    }
  });


export const signInWithGoogle = (user) => axios.post('/google', user);
