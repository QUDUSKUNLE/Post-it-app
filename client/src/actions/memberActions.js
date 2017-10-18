import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { helpGetRegisteredUsers } from '../helper/helper.js';
import {
  ALL_USERS, ADD_MEMBER_ERROR,
  ADD_MEMBER, GET_MEMBERS_OF_GROUP } from '../constants/ActionConstants.js';

/**
 * @description - Get members of a group
 * @param {any} groupId -
 * @returns {function} dispatch - dispatch to MemberStore
 */
export const getGroupMember = (groupId) => axios.get(
  `/api/v1/getMembers/${groupId}`)
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
 * @description - Get all registered Users
 * @param {any} null -
 * @returns {function} dispatch - dispatch to MemberStore
 */
export const getAllUsers = () => axios.get('/api/v1/getAllRegisteredUsers')
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: ALL_USERS,
      allUser: helpGetRegisteredUsers(data)
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: ALL_USERS,
      error: response.data.message
    });
  });

/**
 * @description - addMember to a group
 * @param {object} memberDetails - { memberDetails }
 * @returns {object} object
 */
export const addMember = (memberDetails) =>
  axios.post(`/api/v1/addmember/${memberDetails.groupId}`, memberDetails)
    .then(({ data }) => {
      AppDispatcher.dispatch({
        type: ADD_MEMBER,
        member: data.response
      });
    })
    .catch(({ error }) => {
      AppDispatcher.dispatch({
        type: ADD_MEMBER_ERROR,
        error: error.response.data.error
      });
    });

