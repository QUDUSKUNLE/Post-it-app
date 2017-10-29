import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
  GET_USER_GROUPS,
  CREATE_GROUP } from '../constants/ActionConstants';

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
    this.creategroup = '';
    this.allGroups = this.allGroups.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  /**
   * @method allGroups
   * @return {object} groups - The groups stored in the constructor
   */
  allGroups() {
    return this.groups;
  }

  createGroup() {
    return this.creategroup;
  }

  /**
   * Receives actions and update the stores accordingly
   * @method handleActions
   * @param {object} action - Action type and data
   * @return {*} -
   */
  handleActions(action) {
    switch (action.type) {
      case GET_USER_GROUPS:
        this.groups = action.groups;
        this.emit('GET_USER_GROUPS');
        break;
      case CREATE_GROUP:
        this.creategroup = action.message;
        this.emit('CREATE_GROUP');
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
