import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { memberOfGeneralGroups } from '../utils/utils.js';

import {
  GENERAL,
  ADD_MEMBER,
  GET_MEMBERS } from '../constants/ActionConstants.js';

// Get Member of a group Action
// userDetails = {email: email, password: password, group: group}
export const getGroupMembers = (userDetails) => axios.post('/memberlist',
  userDetails)
  .then(({ member }) => {
    AppDispatcher.dispatch({
      type: GET_MEMBERS,
      members: member
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: GET_MEMBERS,
      error: response.data.message
    });
  });

  // Get General Member Action
  // userDetails = { email: email, password: password }
export const generalMembers = (user) => axios.post('/generallist', user)
  .then(({ data }) => {
    // const general = data.member;
    AppDispatcher.dispatch({
      type: GENERAL,
      general: memberOfGeneralGroups(data.member)
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
