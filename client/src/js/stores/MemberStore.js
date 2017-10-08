import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { getGroupMembers } from '../helper/helper.js';

import {
  GENERAL, ADD_MEMBER,
  GET_MEMBERS_OF_GROUP } from
  '../constants/ActionConstants.js';

/**
 * Holds the storage, listen to actions and update the stores
 * @class MemberStore
 */
class MemberStore extends EventEmitter {
  /**
   * sets the members, general to an empty []
   * @constructor
   */
  constructor() {
    super();
    this.groupIndex = [];
    this.members = [];
    this.group = '';
    this.groupId = '';
    this.general = [];
    this.allGroupMembers = this.allGroupMembers.bind(this);
    this.allGeneralUsers = this.allGeneralUsers.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  /**
   * @method allGeneralUsers
   * @return {object} generalmembers - The general stored in the constructor
   */
  allGeneralUsers() {
    return this.general;
  }

  /**
   * @method allGroupMembers
   * @return {object} [members & group] - members and group stored in the
    constructor
   */
  allGroupMembers() {
    return [this.members, this.group, this.groupId];
  }

  /**
   * Receives actions and update the stores accordingly
   * @method handleActions
   * @param {object} action - Action type and data
   * @return {null} -
   */
  handleActions(action) {
    switch (action.type) {
      case GENERAL:
        this.general = action.general;
        this.emit('GENERAL');
        break;

      case GET_MEMBERS_OF_GROUP:
        this.groupIndex.push((action.members)[0]);
        this.members = getGroupMembers(this.groupIndex);
        this.groupId = (action.members)[1];
        this.group = (action.members)[2];
        this.emit('GET_MEMBERS_OF_GROUP');
        break;

      case ADD_MEMBER:
        this.members.push(action.members);
        this.emit('ADD_MEMBER');
        break;

      default:
    }
  }
}

// create a new instance of MemberStore
const memberStore = new MemberStore();

// register an AppDispatcher and bind it to handleActions method
AppDispatcher.register(memberStore.handleActions.bind(memberStore));

// export an instance of MemberStore
export default memberStore;
