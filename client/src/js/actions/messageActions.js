import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { GET_GROUP_MESSAGE,
  SEND_MESSAGE,
  SEND_MESSAGE_ERROR } from '../constants/ActionConstants.js';


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
