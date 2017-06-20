// AppActions
import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import ActionTypes from '../constants/AppConstants.jsx';
import AppDispatcher from '../dispatcher/AppDispatcher.jsx';

const AppActions = {
  signup: () => {
    axios.post('/user/signup')
      .then(() => {
        AppDispatcher.handleViewAction({
          actionTypes: ActionTypes.SIGNUP_USER
        });
      })
      .then(() => {
        AppDispatcher.handleViewAction({
          actionTypes: ActionTypes.SIGNUP_USER_FAILED,
          error: 'Error sign in up'
        });
      });
  }
};

export default AppActions;
