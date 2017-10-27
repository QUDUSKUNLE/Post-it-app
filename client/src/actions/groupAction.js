import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { helpGetGroups } from '../helper/helper.js';

import { GET_USER_GROUPS, CREATE_GROUP, CREATE_GROUP_ERROR
} from '../constants/ActionConstants.js';


/**
 * @description - Get groups of a user
 * @param {string} userId -
 * @returns {function} dispatch - dispatch to GroupStore
 */
export const getUserGroups = (userId) => axios.get(
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
export const createGroup = (groupName) => axios.post(
  '/api/v1/createGroup', groupName)
    .then(({ data }) =>
      AppDispatcher.dispatch({
        type: CREATE_GROUP,
        message: data.message
      }))
    .catch(error => {
      if (error.response) {
        AppDispatcher.dispatch({
          type: CREATE_GROUP_ERROR,
          error: error.response.data.error
        });
      }
    });

