import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {
    GET_GROUP_MESSAGE,
    GET_GENERAL_MESSAGE,
    SEND_GROUP_MESSAGE,
    SEND_GENERAL_MESSAGE
} from '../constants/ActionConstants.js';
import {
    arrayOfGeneralMessage,
    getArrayOfGroupMessage
} from '../utils/utils.js';

/**
 * @description - Get message of a group
 * @param {Object} groupName - { groupName }
 * @returns {function} dispatch - dispatch to MessageStore
 */
export const getGeneralMessage = () => axios.post('/getGeneralMessage')
    .then(({ data }) => {
      AppDispatcher.dispatch({
        type: GET_GENERAL_MESSAGE,
        message: arrayOfGeneralMessage(data)
      });
    }, ({ response }) => {
      AppDispatcher.dispatch({
        type: GET_GENERAL_MESSAGE,
        error: response.data.message
      });
    });

/**
 * @description - Get message of a group
 * @param {Object} message - { groupName }
 * @returns {function} dispatch - dispatch to MessageStore
 */
export const sendGeneralMessage = (message) => axios.post('/sendGeneralMessage',
        message)
    .then(({ data }) => {
      AppDispatcher.dispatch({
        type: SEND_GENERAL_MESSAGE,
        message: (data.response)[1]
      });
    }, ({ response }) => {
      AppDispatcher.dispatch({
        type: SEND_GENERAL_MESSAGE,
        error: response.data.message
      });
    });


/**
 * @param {any} group
 */
export const getGroupMessage = (group) => axios.post('/getGroupMessage',
  group)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: GET_GROUP_MESSAGE,
      message: getArrayOfGroupMessage(data)
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: GET_GROUP_MESSAGE,
      error: response.data.message
    });
  });

 /**
 * @param {any} group
 */
export const sendGroupMessage = (group) => axios.post('/sendGroupMessage',
  group)
    .then(({ data }) => {
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
