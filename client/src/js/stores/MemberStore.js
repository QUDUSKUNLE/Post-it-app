import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

import {
  GENERAL, ADD_MEMBER, GET_MEMBERS_OF_A_GROUP } from
  '../constants/ActionConstants.js';


class MemberStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.members = [];
    this.general = [];
    this.allGroupMembers = this.allGroupMembers.bind(this);
    this.allGeneralUsers = this.allGeneralUsers.bind(this);
    this.handleActions = this.handleActions.bind(this);
    this.setGroupMembers = this.setGroupMembers.bind(this);
  }

  allGeneralUsers() {
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

      case GET_MEMBERS_OF_A_GROUP:
        this.members = action.members;
        this.emit('GET_MEMBERS_OF_A_GROUP');
        break;

      case ADD_MEMBER:
        this.members.push(action.members);
        this.emit('ADD_MEMBER');
        break;

      default:
    }
  }
}

const memberStore = new MemberStore();

AppDispatcher.register(memberStore.handleActions.bind(memberStore));

export default memberStore;
