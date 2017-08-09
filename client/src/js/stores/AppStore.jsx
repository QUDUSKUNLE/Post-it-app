import { EventEmitter } from 'events';
import ActionTypes from '../constants/AppConstants.jsx';
import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import assign from 'object-assign';
import AppAPI from '../utils/AppAPI.jsx';

const CHANGE_EVENT = 'change';
let _members = [];

const AppStore = assign({}, EventEmitter.prototype, {
  getMembers() {
    return _members;
  },

  saveMember(member) {
    _members.push(member);
  },

  setMembers(members) {
    _members = members;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.ActionTypes) {
  case ActionTypes.ADD_MEMBER:
    console.log('saving Member');

    // Save to Store
    AppStore.saveMember(action.member);

    // Save to API
    AppAPI.saveMember(action.member);

    // Emit change
    AppStore.emit(CHANGE_EVENT);
    break;
  case ActionTypes.RECEIVE_MEMBER:
    console.log('Receiving member');
    // Store save
    AppStore.setMembers(action.members);
    // Emit change
    AppStore.emit(CHANGE_EVENT);
    break;

  default:
    return true;
  }
  // AppStore.emitChange();
  return true;
});

export default AppStore;
