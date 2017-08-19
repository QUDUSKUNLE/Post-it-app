import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

import {
  GET_GROUPS,
  CREATE_NEW_GROUP } from '../constants/ActionConstants.js';


// Get Groups Action
export const getGroups = (user) => axios.post('/getgroups', user)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: GET_GROUPS,
      groups: data.groupMembers
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: GET_GROUPS,
      error: response.data.message
    });
  });


// Create new Group Action
export const createGroup = (userDetails) => axios.post('/creategroup',
  userDetails)
  .the(({ data }) => {
    AppDispatcher.dispatch({
      type: CREATE_NEW_GROUP,
      group: data.message
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: CREATE_NEW_GROUP,
      error: response.data.message
    });
  });
