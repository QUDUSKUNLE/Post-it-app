import ActionTypes from '../constants/AppConstants.jsx';
import Dispatcher from '../dispatcher/AppDispatcher.jsx';
import AppAPI from '../utils/AppAPI.jsx';

/**
 * dispatches it to the store.
 * @class AppActions
 */
const AppActions = {

  /**
   *This function gets the sources JSON data from the api function
   * @param {string} user
   * @returns {array} sources - returns an array of sources
   * @memberof AppActions
   */
  signinUser: (user) => {
    const newUser = AppAPI.signInUser(user);
    // Hey Dispatcher, go tell all the stores that a user needs sign in
    // Payload = { actionType: '', data: {}}
    Dispatcher.dispatch({
      Type: ActionTypes.SIGNIN_USER,
      User: newUser
    });
  }


};
export default AppActions;
