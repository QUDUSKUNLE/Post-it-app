// SignIn Store
import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/AppDispatcher.jsx';
import ActionTypes from '../constants/AppConstants.jsx';
import assign from 'object-assign';
const CHANGE_EVENT = 'change';
// import _ from 'lodash';


/**
 *Listens and stores data from the action according to their action type
 * @class SigninStore
 * @extends {EventEmitter}
 */
const newUsers = [];

const SigninStore = assign({}, EventEmitter.prototype, {

  addChangeListener: (callback) => {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: (callback) => {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange: () => {
    this.emit(CHANGE_EVENT);
  },

  getAllUsers: () => newUsers,
  // getUsers: (id) => _.find(newUsers, { id: id })
});

Dispatcher.register((action) => {
  switch (action.actionType) {
  case ActionTypes.SIGNIN_USER:
    newUsers.push(action.User);
    SigninStore.emitChange();
    break;

  default:
    return true;

  }
});

export default SigninStore;
