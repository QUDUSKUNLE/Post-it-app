import axios from 'axios';
import toastr from 'toastr';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { helpGetGroups } from '../helper/helper.js';
import {
  GET_USER_GROUPS,
  CREATE_GROUP,
} from '../constants/ActionConstants.js';

/**
 * @description - Get groups of a user
 * @param {string} userId -
 * @returns {function} dispatch - dispatch to GroupStore
 */
export const getUserGroups = userId => axios.get(
  `/api/v1/getgroups/${userId}`)
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
  });

/**
 * @function createGroup
 * @param {object} groupName - { andela }
 * @returns {object} object
 */
export const createGroup = groupName => axios.post(
  '/api/v1/createGroup', groupName)
    .then(({ data }) =>
      AppDispatcher.dispatch({
        type: CREATE_GROUP,
        message: data.message
      }))
    .catch(error => toastr.error(error.response.data.error));

