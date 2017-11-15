import axios from 'axios';
import toastr from 'toastr';
import catchError from '../helper/catchError';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { helpGetRegisteredUsers } from '../helper/helper.js';
import {
  ALL_USERS,
  ADD_MEMBER,
  GET_MEMBERS_OF_GROUP } from '../constants/ActionConstants.js';

/**
 * @description - An action that makes API call to server
 *  to get members of a group
 * @param {any} groupId - Is the group identity
 * @returns {function} dispatch - server response is dispatch to MemberStore
 */
export const getGroupMember = groupId => axios.get(
  `/api/v1/getMembers/${groupId}`)
  .then(({ data }) => {
    if ((data.response)[0] === null) {
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
 * @description - An action that makes API call to server
 *  to get all registered users
 * @param {*} void - No paramater
 * @returns {function} dispatch - server response is dispatch to MemberStore
 */
export const getAllUsers = () => axios.get('/api/v1/getRegisteredUsers')
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: ALL_USERS,
      allUser: helpGetRegisteredUsers(data)
    });
  }).catch((response) => {
    if (response.data) {
      toastr.error(response.data.message);
    }
  });

/**
 * @description - An action that makes API call to server
 *  to add member to a groups
 * @param {object} memberDetails - This contains details of a member
 * @returns {function} dispatch - server response is dispatch to MemberStore
 */
export const addMember = memberDetails =>
  axios.post(`/api/v1/addMember/${memberDetails.groupId}`, memberDetails)
    .then(({ data }) => {
      AppDispatcher.dispatch({
        type: ADD_MEMBER,
        member: data.response
      });
    })
    .catch(error => catchError(error));
