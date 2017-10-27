import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  GET_GROUP_MESSAGE, SEND_GROUP_MESSAGE } from
  '../constants/ActionConstants';


/**
 * @class MessageStore
 * @extends {EventEmitter}
 */
class MessageStore extends EventEmitter {
  /**
   * Creates an instance of MessageStore.
   * @memberof MessageStore
   */
  constructor() {
    super();
    this.groupMessage = [];
    this.allGroupMessage = this.allGroupMessage.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  /**
   * @returns {object} - groupMessage
   * @memberof MessageStore
   */
  allGroupMessage() {
    return this.groupMessage;
  }

  /**
   * @param {any} action - payload
   * @memberof MessageStore
   * @return {*} action
   */
  handleActions(action) {
    switch (action.type) {
      case GET_GROUP_MESSAGE:
        this.groupMessage = action.message;
        this.emit('GET_GROUP_MESSAGE');
        break;

      case SEND_GROUP_MESSAGE:
        this.groupMessage.push(action.message);
        this.emit('SEND_GROUP_MESSAGE');
        break;

      default:
    }
  }
}

// create a new instance of MessageStore
const messageStore = new MessageStore();

// register an AppDispatcher and bind it to handleActions method
AppDispatcher.register(messageStore.handleActions.bind(messageStore));

// export an instance of MessageStore
export default messageStore;
