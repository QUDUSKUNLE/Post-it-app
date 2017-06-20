// import dispatch from '../dispatcher/AppDispatcher.jsx';
import { EventEmitter } from 'events';
import ActionTypes from '../constants/AppConstants.jsx';
import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';
let signup = {
  email: '',
  password: '',
  username: ''
};
// SignUp Stores
function SignUpUser(newUser) {
  signup = newUser;
}

const AppStore = assign({}, EventEmitter.prototype, {
  emitChange: () => {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: (callback) => {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * Return the value for signup.
   */
  getSignUPUser: function () {
    return signup;
  }
});

AppStore.dispatchToken = AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.ActionTypes) {
  case ActionTypes.SIGNIN_USER:
    SignUpUser(action.newUser);
    break;

  default:
    return true;
  }
  AppStore.emitChange();
  return true;
});

export default AppStore;
