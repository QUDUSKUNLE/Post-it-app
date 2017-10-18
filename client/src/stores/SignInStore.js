import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
  SIGN_IN_SUCCESS, SIGN_IN_ERROR,
  GOOGLE_SIGN_IN_SUCCESS, GOOGLE_SIGN_IN_ERROR,
  PASSWORD_RESET_SUCCESS, PASSWORD_RESET_ERROR
} from '../constants/ActionConstants';

/**
 * Signout Store, it hold user's state, listen to signin Actions
 * @class SignInStore
 */
class SignInStore extends EventEmitter {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.signInMessage = {};
    this.googleSignInMessage = {};
    this.passwordResetResponse = {};
    this.signInUser = this.signInUser.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.passwordReset = this.passwordReset.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  signInUser() {
    return this.signInMessage;
  }

  googleSignIn() {
    return this.googleSignInMessage;
  }

  passwordReset() {
    return this.passwordResetResponse;
  }

  /**
   * Receives actions and update the stores accordingly
   * @method handleActions
   * @param {object} action - Action type and data
   * @return {null} -
   */
  handleActions(action) {
    switch (action.type) {
      case SIGN_IN_SUCCESS:
        this.signInMessage = action.response;
        this.emit('SIGN_IN_SUCCESS');
        break;

      case SIGN_IN_ERROR:
        this.signInMessage = action.error;
        this.emit('SIGN_IN_ERROR');
        break;

      case GOOGLE_SIGN_IN_SUCCESS:
        this.googleSignInMessage = action.response;
        this.emit('GOOGLE_SIGN_IN_SUCCESS');
        break;

      case GOOGLE_SIGN_IN_ERROR:
        console.log(action.error);
        this.googleSignInMessage = action.error;
        this.emit('GOOGLE_SIGN_IN_ERROR');
        break;

      case PASSWORD_RESET_SUCCESS:
        this.passwordResetResponse = action.response;
        this.emit('PASSWORD_RESET_SUCCESS');
        break;

      case PASSWORD_RESET_ERROR:
        this.passwordResetResponse = action.error;
        this.emit('PASSWORD_RESET_ERROR');
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
