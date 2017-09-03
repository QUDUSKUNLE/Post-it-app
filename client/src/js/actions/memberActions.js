import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { getAllGeneralUsers, getMembersOfAGroup } from '../utils/utils.js';

import {
  GENERAL,
  ADD_MEMBER,
  GET_MEMBERS_OF_A_GROUP } from '../constants/ActionConstants.js';

// Get Member of a group Action
// userDetails = {email: email, password: password, group: group}
export const getGroupMembers = (name) => axios.post('/memberlist', name)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: GET_MEMBERS_OF_A_GROUP,
      group: name,
      members: getMembersOfAGroup(data)
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: GET_MEMBERS_OF_A_GROUP,
      error: response.data.message
    });
  });

  // Get General Users Action
export const generalUsers = () => axios.post('/generallist')
  .then(({ data }) => {
    // console.log('Oh!! you are here', data);
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

// Add Member to a group Action
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
