import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { GET_GROUP_MESSAGE,
  SEND_MESSAGE,
  SEND_MESSAGE_ERROR } from '../constants/ActionConstants.js';

/**
  * @description - Get groups of a user
  * @param {Object} group - { groupname, message }
  * @returns {function} dispatch - dispatch to MemberStore
*/
export const sendGroupMessage = (group) => axios.post('/groupName/message',
  group)
  .then(({ data }) => {
    // console.log(data.response[2]);
    AppDispatcher.dispatch({
      type: SEND_MESSAGE,
      message: data.response[2]
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: SEND_MESSAGE_ERROR,
      error: response.data.message
    });
  });

/**
  * @description - Get groups of a user
  * @param {Object} groupName - { groupName }
  * @returns {function} dispatch - dispatch to MemberStore
*/
export const getgroupMessage = (groupName) => axios.post('/groupName/message',
  groupName)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: GET_GROUP_MESSAGE,
      allGeneralMessage: data
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: GET_GROUP_MESSAGE,
      error: response.data.message
    });
  });
