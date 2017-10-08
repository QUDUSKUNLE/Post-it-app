import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { getAllGeneralUsers } from '../helper/helper.js';
import {
  GENERAL,
  ADD_MEMBER, GET_MEMBERS_OF_GROUP } from '../constants/ActionConstants.js';


/**
  * @description - Get members of a group
  * @param {object} GroupName - { GroupName }
  * @returns {function} dispatch - dispatch to MemberStore
*/

export const getGroupMember = (groupId) => axios.get(
  `/getMembers/${groupId}`)
    .then(({ data }) => {
      if (data.response[0] === null) {
        AppDispatcher.dispatch({
          type: GET_MEMBERS_OF_GROUP,
          members: []
        });
      } else {
        AppDispatcher.dispatch({
          type: GET_MEMBERS_OF_GROUP,
          members: data.response
        });
      }
    });


/**
  * @description - Get members of general
  * @param {null} null - null
  * @returns {function} dispatch - dispatch to MemberStore
*/
export const getAllUsers = () => axios.post('/getAllUsers')
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: GENERAL,
      general: getAllGeneralUsers(data)
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: GENERAL,
      error: response.data.message
    });
  });

/**
 * @function addMember
 * @param {object} member - { member }
 * @returns {object} object
 */
export const addMember = (member) => axios.post('/group/member', member);
