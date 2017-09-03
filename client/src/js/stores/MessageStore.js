import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

import {
  GENERAL_MESSAGES, ADD_MESSAGE,
  GET_GROUP_MESSAGES, SEND_MESSAGE } from
  '../constants/ActionConstants.js';


class MessageStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.message = [];
    this.generalMessages = [];
    this.groupMessages = [];
    this.allGroupMessages = this.allGroupMessages.bind(this);
    this.allGeneralMessages = this.allGeneralMessages.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  allGeneralMessages() {
    return this.general;
  }

  allGroupMessages() {
    return this.members;
  }

  sendMessage() {
    return this.message;
  }

  handleActions(action) {
    switch (action.type) {
      case GENERAL_MESSAGES:
        this.general = action.general;
        this.emit('GENERAL_MESSAGES');
        break;

      case GET_GROUP_MESSAGES:
        this.members = action.members;
        this.emit('GET_GROUP_MESSAGES');
        break;

      case ADD_MESSAGE:
        this.members.push(action.members);
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

const messageStore = new MessageStore();

AppDispatcher.register(messageStore.handleActions.bind(messageStore));

export default messageStore;
