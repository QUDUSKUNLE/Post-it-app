import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { GET_GENERAL_MESSAGE } from '../constants/ActionConstants.js';


export const generalMessageAction = (messag) => axios.post('/groupName/message',
  messag)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: GET_GENERAL_MESSAGE,
      allGeneralMessage: data.message
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: GET_GENERAL_MESSAGE,
      error: response.data.message
    });
  });
