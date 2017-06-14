import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import ActionTypes from '../constants/AppConstants.jsx';
import events from 'events';
const EventEmitter = events.EventEmitter;
import assign from 'object-assign';

// import AppAPI from '../utils/AppAPI.js';

const CHANGE_EVENT = 'change';
let signupuser = {
  email: '',
  password: '',
  username: ''
};

// function signupuser
function setsignUpUser(email, password, username) {
  signupuser = {
    email: email,
    password: password,
    username: username
  };
}

const AppStore = assign({}, EventEmitter.prototype, {
  emitChange: () => {
    this.emit(CHANGE_EVENT);
  },
  // change listener
  addChangeListener: (callback) => {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: (callback) => {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

getsignUpUser = () => {
  return signupuser;
};

AppStore.dispatcherToken = AppDispatcher.register((payload) => {
  const action = payload.action;
  // Case actionTypes
  switch (action.actionTypes) {
  case ActionTypes.SIGNUP_USER:
    setsignUpUser(action.signUp);
    break;

  default:
    return true;
  }
  AppStore.emitChange();
  return true;
});

module.exports = AppStore;
