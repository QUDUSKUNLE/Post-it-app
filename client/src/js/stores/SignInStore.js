import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {
  SIGN_IN_SUCCESS, SIGN_IN_ERROR
} from '../constants/ActionConstants.js';

/**
 * Signout Store, it hold user's state, listen to signin Actions
 * @class SignInStore
 */
class SignInStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.handleActions = this.handleActions.bind(this);
  }

  handleActions(action) {
    switch (action.type) {
      case SIGN_IN_SUCCESS:
        this.emit('SIGN_OUT_SUCCESS');
        break;

      case SIGN_IN_ERROR:
        this.emit('SIGN_IN_ERROR');
        break;

      default:
    }
  }
}

// Initiate an instance of SignInStore
const signInStore = new SignInStore();

// Register a dispatcher and bind it to handleActions method
AppDispatcher.register(signInStore.handleActions.bind(signInStore));

// export an instance of SignInStore
export default signInStore;
