import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

import {
  GENERAL_MESSAGES, ADD_MESSAGE,
  GET_GROUP_MESSAGES, SEND_MESSAGE } from
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
    this.message = [];
    this.generalMessages = [];
    this.groupMessages = [];

    this.allGroupMessages = this.allGroupMessages.bind(this);
    this.allGeneralMessages = this.allGeneralMessages.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  /**
   * @method allGeneralMessages
   * @return {object} generalMessages - The generalMessages stored in the
    constructor
   */
  allGeneralMessages() {
    return this.generalMessages;
  }

  /**
   * @method allGroupMessages
   * @return {object} groupMessages - The groupMessages stored in the
    constructor
   */
  allGroupMessages() {
    return this.groupMessages;
  }

  /**
   * @method sendMessages
   * @return {object} message - The message stored in the
    constructor
   */
  sendMessage() {
    return this.message;
  }

  /**
   * Receives actions and update the stores accordingly
   * @method handleActions
   * @param {object} action - Action type and data
   * @return {null} -
   */
  handleActions(action) {
    switch (action.type) {
      case GENERAL_MESSAGES:
        this.generalMessages = action.general;
        this.emit('GENERAL_MESSAGES');
        break;

      case GET_GROUP_MESSAGES:
        this.generalMessages = action.members;
        this.emit('GET_GROUP_MESSAGES');
        break;

      case ADD_MESSAGE:
        this.groupMessages.push(action.members);
        this.emit('ADD_MESSAGE');
        break;

      case SEND_MESSAGE:
        this.message.push(action.message);
        this.emit('SEND_MESSAGE');
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
