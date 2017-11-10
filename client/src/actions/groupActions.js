import axios from 'axios';
import toastr from 'toastr';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { helpGetGroups } from '../helper/helper';
import {
  GET_USER_GROUPS,
  CREATE_GROUP,
} from '../constants/ActionConstants';

/**
 * @description - An action that makes API call to server
 *  to get groups of a user
 * @function getUserGroups
 * @param {string} userId - The User identity
 * @returns {function} dispatch - Server Response is dispatch to GroupStore
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
  });
};

/**
 * @description - An action that makes API call to server
 *  to create group for a user
 * @function createGroup
 * @param {object} groupName - The name of group to be created
 * @returns {function} dispatch - Server response is dispatch to GroupStore
 */
export const createGroup = groupName => axios.post('/api/v1/createGroup',
  groupName)
    .then(({ data }) => {
      AppDispatcher.dispatch({
        type: CREATE_GROUP,
        message: data.message
      });
    }).catch(error => toastr.error(error.response.data.error));
