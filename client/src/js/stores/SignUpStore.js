import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {
  SIGN_UP_SUCCESS, SIGN_UP_ERROR
} from '../constants/ActionConstants.js';

/**
 * Signout Store, it hold user's state, listen to signin Actions
 * @class SignUpStore
 */
class SignUpStore extends EventEmitter {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.signUpMessage = {};
    this.signUpUser = this.signUpUser.bind(this);
    this.handleSignUpActions = this.handleSignUpActions.bind(this);
  }

  signUpUser() {
    return this.signUpMessage;
  }
  /**
   * Receives actions and update the stores accordingly
   * @method handleSignUpActions
   * @param {object} action - Action type and data
   * @return {null} -
   */
  handleSignUpActions(action) {
    switch (action.type) {
      case SIGN_UP_SUCCESS:
        this.signUpMessage = (action.response);
        this.emit('SIGN_UP_SUCCESS');
        break;

      case SIGN_UP_ERROR:
        this.signUpMessage = action.error;
        this.emit('SIGN_UP_ERROR');
        break;

      default:
    }
  }
}

// Initiate an instance of SignInStore
const signUpStore = new SignUpStore();

// Register a dispatcher and bind it to handleActions method
AppDispatcher.register(signUpStore.handleSignUpActions.bind(signUpStore));

// export an instance of SignInStore
export default signUpStore;
