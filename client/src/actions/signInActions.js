import axios from 'axios';
import toastr from 'toastr';
import AppDispatcher from '../dispatcher/AppDispatcher';
import setAuthToken from '../helper/setAuthToken';
import {
  SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_SUCCESS } from '../constants/ActionConstants';

/**
 * @description - An action that makes API call to server
 *  to sign in a user
 * @param {object} user - This contains email and password of a user
 * @returns {function} dispatch - server response is dispatch to SignInStore
 */
export const signInAction = user => axios.post('/api/v1/signin', user)
  .then(({ data }) => {
    toastr.success(data.message);
    localStorage.setItem('user', JSON.stringify(data.user));
    setAuthToken(JSON.parse(localStorage.getItem('user'))
      .stsTokenManager.accessToken);
    AppDispatcher.dispatch({
      type: SIGN_IN_SUCCESS,
      response: data.user
    });
  }).catch((error) => {
    if (error.response) {
      toastr.error(error.response.data.error.message);
    };
  })

/**
 * @description - An action that makes API call to server
 *  to sign in user`s via Google
 * @param {object} user - This contains user credential provided by Google
 * @returns {object} dispatch - server response is dispatch to SignInStore
 */
export const signInWithGoogle = user => axios.post('/api/v1/google', user)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: GOOGLE_SIGN_IN_SUCCESS,
      response: data
    });
  }).catch(error => toastr.error(error.response));

