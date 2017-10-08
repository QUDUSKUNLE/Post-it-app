import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { getGroups } from '../helper/helper.js';

import { GET_USER_GROUPS
} from '../constants/ActionConstants.js';


/**
 * @description - Get groups of a user
 * @param {null} null -
 * @returns {function} dispatch - dispatch to GroupStore
 */
export const getGroup = (userId) => axios.get(`/getgroups/${userId}`)
  .then(({ data }) => {
    if (data.response[0] === null) {
      AppDispatcher.dispatch({
        type: GET_USER_GROUPS,
        groups: []
      });
    } else {
      AppDispatcher.dispatch({
        type: GET_USER_GROUPS,
        groups: getGroups(data.response)
      });
    }
  });

/**
 * @function createGroup
 * @param {object} groupName - { andela }
 * @returns {object} object
 */
export const userCreateNewGroup = (groupName) =>
axios.post('/userCreate', groupName);

