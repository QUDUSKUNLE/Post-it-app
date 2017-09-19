import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

import {
  GET_GENERAL_MESSAGE, SEND_GENERAL_MESSAGE,
  GET_GROUP_MESSAGE, SEND_GROUP_MESSAGE } from
  '../constants/ActionConstants.js';

/**
 * Holds the storage, listen to actions and update the stores
 * @class MessageStore
 */
class MessageStore extends EventEmitter {
  /**
   * sets the groups to an empty []
   * @constructor
   */
  constructor() {
    super();
    this.generalMessage = [];
    this.groupMessage = [];

    this.allGroupMessages = this.allGroupMessage.bind(this);
    this.allGeneralMessage = this.allGeneralMessage.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  /**
   * @method allGeneralMessages
   * @return {object} generalMessages - The generalMessages stored in the
    constructor
   */
  allGeneralMessage() {
    return this.generalMessage;
  }

  /**
   * @method allGroupMessages
   * @return {object} groupMessages - The groupMessages stored in the
    constructor
   */
  allGroupMessage() {
    return this.groupMessage;
  }

  /**
   * Receives actions and update the stores accordingly
   * @method handleActions
   * @param {object} action - Action type and data
   * @return {null} -
   */
  handleActions(action) {
    switch (action.type) {
      case GET_GENERAL_MESSAGE:
        this.generalMessage = action.message;
        this.emit('GET_GENERAL_MESSAGE');
        break;

      case SEND_GENERAL_MESSAGE:
        this.generalMessage.push(action.message);
        this.emit('SEND_GENERAL_MESSAGE');
        break;

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
