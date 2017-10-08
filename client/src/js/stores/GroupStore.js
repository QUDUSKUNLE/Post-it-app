import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {
  GET_GROUPS,
  CREATE_NEW_GROUP } from '../constants/ActionConstants.js';

/**
 * Holds the storage, listen to actions and update the stores
 * @class GroupStore
 */
class GroupStore extends EventEmitter {
  /**
   * sets the groups to an empty []
   * @constructor
   */
  constructor() {
    super();
    this.groups = [];
    this.allGroups = this.allGroups.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  /**
   * @method allGroups
   * @return {object} groups - The groups stored in the constructor
   */
  allGroups() {
    return this.groups;
  }

  /**
   * Receives actions and update the stores accordingly
   * @method handleActions
   * @param {object} action - Action type and data
   * @return {null} -
   */
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

// create a new instance of GroupStore
const groupStore = new GroupStore();

// register an AppDispatcher and bind it to handleActions method
AppDispatcher.register(groupStore.handleActions.bind(groupStore));

// export an instance of GroupStore
export default groupStore;
