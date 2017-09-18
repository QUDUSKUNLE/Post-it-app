import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { getAllGeneralUsers, getMembersOfAGroup } from '../utils/utils.js';

import {
  GENERAL,
  ADD_MEMBER,
  GET_MEMBERS_OF_A_GROUP } from '../constants/ActionConstants.js';


/**
  * @description - Get members of a group
  * @param {object} GroupName - { GroupName }
  * @returns {function} dispatch - dispatch to MemberStore
*/
export const getGroupMembers = (GroupName) => axios.post('/memberlist',
  GroupName)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: GET_MEMBERS_OF_A_GROUP,
      group: GroupName,
      members: getMembersOfAGroup(data)
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: GET_MEMBERS_OF_A_GROUP,
      error: response.data.message
    });
  });


/**
  * @description - Get members of general
  * @param {null} null - null
  * @returns {function} dispatch - dispatch to MemberStore
*/
export const generalUsers = () => axios.post('/generallist')
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
  * @description - Add user`s to a group
  * @param {object} userDetails - { groupName, username}
  * @returns {function} dispatch - dispatch to MemberStore
*/
export const addMember = (userDetails) => axios.post('/group/member',
  userDetails)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: ADD_MEMBER,
      members: data.message
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: ADD_MEMBER,
      error: response.data.message
    });
  });
