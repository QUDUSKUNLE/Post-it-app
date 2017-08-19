import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

import {
  GET_GROUPS,
  CREATE_NEW_GROUP } from '../constants/ActionConstants.js';

class GroupStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.groups = [];
    this.allGroups = this.allGroups.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  allGroups() {
    return this.groups;
  }

  handleActions(action) {
    switch (action.type) {
      case GET_GROUPS:
        this.groups = action.groups;
        this.emit('GET_GROUPS');
        break;
      case CREATE_NEW_GROUP:
        this.groups.push(action.groups);
        this.emit('CREATE_NEW_GROUP');
        break;
      default:
    }
  }
}

const groupStore = new GroupStore();

AppDispatcher.register(groupStore.handleActions.bind(groupStore));

export default groupStore;
