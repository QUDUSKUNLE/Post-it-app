import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { getGroupMembers } from '../helper/convertObject';
import {
  ADD_MEMBER,
  GET_MEMBERS_OF_GROUP, SEARCH_USER } from '../constants/ActionConstants';

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
    this.searchUser = {};
    this.addMemberResponse = '';
    this.getSearchUser = this.getSearchUser.bind(this);
    this.allGroupMembers = this.allGroupMembers.bind(this);
    this.addMember = this.addMember.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  /**
   * @method getSearchUser
   * @return {object} searchUser - searchUser stored in the constructor method
   */
  getSearchUser() {
    return [this.searchUser];
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
   * @method addMember
   * @return {string} addMemberResponse - addMemberResponse in the store
   */
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
      case GET_MEMBERS_OF_GROUP:
        this.groupIndex = action.members;
        this.members = getGroupMembers(this.groupIndex);
        this.groupId = (action.members)[1];
        this.group = (action.members)[2];
        this.emit('GET_MEMBERS_OF_GROUP');
        break;

      case SEARCH_USER:
        this.searchUser = action.search;
        this.emit('SEARCH_USER');
        break;

      case ADD_MEMBER:
        this.addMemberResponse = action.member;
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
