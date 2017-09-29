import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { getUserGroups } from '../utils/utils.js';

import {
  GET_GROUPS
} from '../constants/ActionConstants.js';


/**
 * @description - Get groups of a user
 * @param {null} null -
 * @returns {function} dispatch - dispatch to GroupStore
 */
export const getUserGroup = () => axios.post('/getUserGroups')
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: GET_GROUPS,
      groups: getUserGroups(data)
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: GET_GROUPS,
      error: response.data.message
    });
  });

/**
 * @function createGroup
 * @param {object} groupName - { andela }
 * @returns {object} object
 */
export const userCreateNewGroup = (groupName) =>
axios.post('/userCreateNewGroup', groupName);

