
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {
  SIGN_OUT_SUCCESS, SIGN_OUT_ERROR
} from '../constants/ActionConstants.js';

/**
 * Signout Store, it hold user's state, listen to signout Actions
 * @class SignOutStore
 */
class SignOutStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.handleActions = this.handleActions.bind(this);
  }

  handleActions(action) {
    switch (action.type) {
      case SIGN_OUT_SUCCESS:
        this.emit('SIGN_OUT_SUCCESS');
        break;

      case SIGN_OUT_ERROR:
        this.emit('SIGN_OUT_ERROR');
        break;

      default:
    }
  }
}

// Initiate an instance of SignOutStore
const signOutStore = new SignOutStore();

// Register a dispatcher and bind it to handleActions method
AppDispatcher.register(signOutStore.handleActions.bind(signOutStore));

// export an instance of SignOutStore
export default signOutStore;
