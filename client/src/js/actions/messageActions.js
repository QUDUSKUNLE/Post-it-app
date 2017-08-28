import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { GET_GROUP_MESSAGE } from '../constants/ActionConstants.js';


export const sendGroupMessage = (group) => axios.post('/groupName/message',
  group);

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
