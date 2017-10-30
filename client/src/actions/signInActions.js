import axios from 'axios';
import toastr from 'toastr';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {
  SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_SUCCESS } from '../constants/ActionConstants.js';

/**
 * @description - Sign in Action
 * @param {any} user - { email, password }
 * @returns {Object} Object
 */
export const signinAction = user => axios.post('/api/v1/signin', user)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: SIGN_IN_SUCCESS,
      response: data
    });
  }).catch(error => toastr.error(error.response.data.error.message));

/**
 * @description - Sign in with Google
 * @param {any} user - { email, password }
 * @returns {any} Object
 */
export const signInWithGoogle = user => axios.post('/api/v1/google', user)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: GOOGLE_SIGN_IN_SUCCESS,
      response: data
    });
  }).catch(error => toastr.error(error.response));

