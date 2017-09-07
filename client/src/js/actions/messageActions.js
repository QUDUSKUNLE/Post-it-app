import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { GROUP_MESSAGE,
  SEND_GROUP_MESSAGE } from '../constants/ActionConstants.js';

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
      type: SEND_GROUP_MESSAGE,
      message: data.response[2]
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: SEND_GROUP_MESSAGE,
      error: response.data.message
    });
  });

/**
  * @description - Get message of a group
  * @param {Object} groupName - { groupName }
  * @returns {function} dispatch - dispatch to MessageStore
*/
export const GroupMessage = (groupName) => axios.post('/groupMessage',
  groupName)
  .then(({ data }) => {
    console.log(data);
    AppDispatcher.dispatch({
      type: GROUP_MESSAGE,
      message: data
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: GROUP_MESSAGE,
      error: response.data.message
    });
  });
