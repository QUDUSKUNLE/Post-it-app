import axios from 'axios';
import catchError from '../helper/catchError';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { helpGetGroups } from '../helper/formatResponse';
import {
  GET_USER_GROUPS,
  CREATE_GROUP,
} from '../constants/ActionConstants.js';

/**
 * @description - An action that makes API call to server
 *  to get groups of a user
 * @function getUserGroups
 * @param {string} userId - The User identity
 * @returns {object} dispatch - Server Response is dispatch to GroupStore
 */
export const getUserGroups = () => {
  axios.get('/api/v1/getgroups')
  .then(({ data }) => {
    if (data.response[0] === null) {
      AppDispatcher.dispatch({
        type: GET_USER_GROUPS,
        groups: []
      });
    } else {
      AppDispatcher.dispatch({
        type: GET_USER_GROUPS,
        groups: helpGetGroups(data.response)
      });
    }
  }).catch(error => catchError(error));
};

/**
 * @description - An action that makes API call to server
 *  to create group for a user
 * @function createGroup
 * @param {object} groupName - The name of group to be created
 * @returns {object} dispatch - Server response is dispatch to GroupStore
 */
export const createGroup = groupName => axios.post('/api/v1/createGroup',
  groupName)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: CREATE_GROUP,
      message: data.message
    });
  }).catch(error => catchError(error));
