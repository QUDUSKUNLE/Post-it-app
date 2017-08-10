// SignIn Store
import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/AppDispatcher.jsx';


/**
 *Listens and stores data from the action according to their action type
 * @class SigninStore
 * @extends {EventEmitter}
 */
class SigninStore extends EventEmitter {
  /**
    * @param {string} props inbuilt props.
  */
  constructor() {
    super();
    this.user = [];
  }

  /**
 * Returns a change in the news article data upon mounting in the headline
 *  component.
 * @returns {object} - users details
 * @checkUser
**/
  checkUser() {
    return this.user;
  }

  /**
 * This function listens for payLoad from the action and stores them
 * according to their action type.
 * @param {object} action - payload from the checkUser Action function
 * @return {object} updated news articles from the action
 * @memberof signInStore
 */
  signInAction(action) {
    if (action.Type === 'SIGNIN_USER') {
      this.user = action.payload;
      this.emit('change');
    }
  }
}

const signinStore = new SigninStore();

Dispatcher.register(signinStore.signInAction.bind(signinStore));

export default signinStore;
