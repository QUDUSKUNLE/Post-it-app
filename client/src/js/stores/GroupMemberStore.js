import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

import {
  GENERAL, ADD_MEMBER, GET_MEMBERS } from '../constants/ActionConstants.js';


class GroupMemberStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.members = [];
    this.general = [];
    this.allGroupMembers = this.allGroupMembers.bind(this);
    this.allGeneralMembers = this.allGeneralMembers.bind(this);
    this.handleActions = this.handleActions.bind(this);
    this.setGroupMembers = this.setGroupMembers.bind(this);
  }

  allGeneralMembers() {
    return this.general;
  }

  allGroupMembers() {
    return this.members;
  }

  setGroupMembers(group) {
    this.members = group;
  }

  handleActions(action) {
    switch (action.type) {
      case GENERAL:
        this.general = action.general;
        this.emit('GENERAL');
        break;

      case GET_MEMBERS:
        this.members = action.members;
        this.emit('GET_MEMBERS');
        break;

      case ADD_MEMBER:
        this.members.push(action.members);
        this.emit('ADD_MEMBER');
        break;

      default:
    }
  }
}

const groupMemberStore = new GroupMemberStore();

AppDispatcher.register(groupMemberStore.handleActions.bind(groupMemberStore));

export default groupMemberStore;
