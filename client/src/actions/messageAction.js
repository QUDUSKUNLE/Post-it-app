import axios from 'axios';
import toastr from 'toastr';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
  GET_GROUP_MESSAGE,
  SEND_GROUP_MESSAGE
} from '../constants/ActionConstants';
import { helpGetGroupMessages } from '../helper/formatResponse';

/**
 * @description - An action that makes API call to server
 *  to get messages of a group
 * @param {string} groupId - This represents the group Identity
 * @returns {object} dispatch - server response is dispatch to MessageStore
 */
export const getGroupMessage = groupId => axios.get(
  `/api/v1/getMessage/${groupId}`)
  .then(({ data }) => {
    const messageResponse = helpGetGroupMessages(data.response);
    AppDispatcher.dispatch({
      type: GET_GROUP_MESSAGE,
      message: messageResponse
    });
  }).catch(error => toastr.error(error.response.data.message));

/**
* @description - An action that makes API call to server
* to send message to a particular group
* @param {Object} messageDetails - This contains message, groupId and priority
* @returns {object} dispatch - Server ressponse is dispatch to MessageStore
*/
export const sendGroupMessage = (messageDetails) => {
  const groupId = messageDetails.groupId;
  axios.post(`/api/v1/sendMessage/${groupId}`,
    messageDetails).then(({ data }) => {
      AppDispatcher.dispatch({
        type: SEND_GROUP_MESSAGE,
        message: data.response[1]
      });
    }).catch(error => toastr.error(error.response.data.message));
};
