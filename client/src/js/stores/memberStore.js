import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

import {
  ADD_MEMBER, GET_MEMBERS
} from '../constants/ActionConstants.js';


class MemberStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.members = [];
    this.allMembers = this.allMembers.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  allMembers() {
    return this.members;
  }

  handleActions(action) {
    switch (action.type) {
      case GET_MEMBERS:
        this.members = action.members;
        this.emit('getMembers');
        break;
      case ADD_MEMBER:
        this.members.push(action.members);
        this.emit('addMember');
        break;
      default:
    }
  }
}

const memberStore = new MemberStore();

AppDispatcher.register(memberStore.handleActions.bind(memberStore));
