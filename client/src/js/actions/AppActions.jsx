import ActionTypes from '../constants/AppConstants.jsx';
import Dispatcher from '../dispatcher/AppDispatcher.jsx';
import AppAPI from '../utils/AppAPI.jsx';

/**
 * dispatches it to the store.
 * @class AppActions
 */
export default class AppActions {

  /**
   *This function gets the sources JSON data from the api function
   * @param {object} user
   * @returns {array} sources - returns an array of sources
   * @memberof AppActions
   */
  static signIn(user) {
    return AppAPI.signInUser(user).then((serverResponse) => {
      Dispatcher.dispatch({
        Type: ActionTypes.SIGNIN_USER,
        payLoad: serverResponse,
      });
    });
  }

}
