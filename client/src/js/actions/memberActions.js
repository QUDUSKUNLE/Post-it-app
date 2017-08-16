import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

import {
  ADD_MEMBER,
  GET_MEMBERS } from '../constants/ActionConstants.js';


// Get Member of a group Action
export const getMembers = (userDetails) => axios.post('/memberlist',
  userDetails)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: GET_MEMBERS,
      memberlist: data.member
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: GET_MEMBERS,
      error: response.data.message
    });
  });

// Add Member to a group Action
export const addMember = (userDetails) => axios.post('/group/member',
  userDetails)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: ADD_MEMBER,
      message: data.message
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: ADD_MEMBER,
      error: response.data.message
    });
  });
