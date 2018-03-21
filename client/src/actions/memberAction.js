import axios from 'axios';
import catchError from '../helper/catchError';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
  SEARCH_USER,
  ADD_MEMBER,
  GET_MEMBERS_OF_GROUP } from '../constants/ActionConstants';

/**
 * @description - An action that makes API call to server
 *  to get members of a group
 * @param {string} groupId - Is the group identity
 * @returns {object} dispatch - server response is dispatch to MemberStore
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
 * @description - An action that makes API call to server that
 * search for users
 * @param {string} keyword - No paramater
 * @returns {object} dispatch - server response is dispatch to MemberStore
 */
export const searchUser = (keyword) =>
  axios.post('/api/v1/search', keyword)
  .then((res) => {
    AppDispatcher.dispatch({
      type: SEARCH_USER,
      search: res.data.response
    });
  });

/**
 * @description - An action that makes API call to server
 *  to add member to a groups
 * @param {object} memberDetails - This contains details of a member
 * @returns {object} dispatch - server response is dispatch to MemberStore
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

/**
 * @description - An action that makes API call to server
 * to check if a username already exist
 * @param { object } userName - username
 * @returns { object } server response
 */
export const isUserNameExist = userName => axios.post('/api/v1/checkuser',
  userName);
