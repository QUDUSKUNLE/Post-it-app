import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { getGroupMembers } from '../helper/helper';
import {
  ALL_USERS,
  ADD_MEMBER,
  ADD_MEMBER_ERROR,
  GET_MEMBERS_OF_GROUP } from '../constants/ActionConstants.js';

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
    this.allUser = [];
    this.group = '';
    this.groupId = '';
    this.addMemberResponse = '';
    this.registeredUsers = this.registeredUsers.bind(this);
    this.allGroupMembers = this.allGroupMembers.bind(this);
    this.addMember = this.addMember.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  /**
   * @method allGeneralUsers
   * @return {object} generalmembers - The general stored in the constructor
   */
  registeredUsers() {
    return this.allUser;
  }

  /**
   * @method allGroupMembers
   * @return {object} [members & group] - members and group stored in the
    constructor
   */
  allGroupMembers() {
    return [this.members, this.group, this.groupId];
  }

  addMember() {
    return this.addMemberResponse;
  }

  /**
   * Receives actions and update the stores accordingly
   * @method handleActions
   * @param {object} action - Action type and data
   * @return {null} -
   */
  handleActions(action) {
    switch (action.type) {
      case ALL_USERS:
        this.allUser = action.allUser;
        this.emit('ALL_USERS');
        break;

      case GET_MEMBERS_OF_GROUP:
        this.groupIndex = [(action.members)[0]];
        this.members = getGroupMembers(this.groupIndex);
        this.groupId = (action.members)[1];
        this.group = (action.members)[2];
        this.emit('GET_MEMBERS_OF_GROUP');
        break;

      case ADD_MEMBER:
        this.addMemberResponse = action.member;
        this.emit('ADD_MEMBER');
        break;

      case ADD_MEMBER_ERROR:
        this.addMemberResponse = action.error;
        this.emit('ADD_MEMBER_ERROR');
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
