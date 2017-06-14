// AppActions
import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import ActionTypes from '../constants/AppConstants.jsx';
// const Promise = require('es6-promise').Promise;
let Api;
// App
const AppActions = {
  // SignUp Action
  UserSignUp: () => {
    Api
      .post('/user/signup')
      .then((signUp) => {
        AppDispatcher.handleViewAction({
          actionTypes: ActionTypes.SIGNUP_USER,
          categories: signUp
        });
      })
      .catch(() => {
        AppDispatcher.handleViewAction({
          actionTypes: ActionTypes.SIGNUP_FAILED,
          error: 'There was an error getting signing up route'
        });
      });
  },
  // SignIn User
  UserSignIn: () => {
    Api
      .post('/user/signup')
      .then((signIn) => {
        AppDispatcher.handleViewAction({
          actionTypes: ActionTypes.SIGNIN_USER,
          categories: signIn
        });
      })
      .catch(() => {
        AppDispatcher.handleViewAction({
          actionTypes: ActionTypes.SIGNIN_ERROR,
          error: 'There is an error signing in'
        });
      });
  },
  // Add CreateGroup
  CreateGroup: () => {
    Api
      .post('/user/group')
      .then((group) => {
        AppDispatcher.handleViewAction({
          actionTypes: ActionTypes.CREATE_GROUP,
          categories: group
        });
      })
      .catch(() => {
        AppDispatcher.handleViewAction({
          actionTypes: ActionTypes.CREATE_GROUP_ERROR,
          error: 'There is an error creating group'
        });
      });
  }
};

export default AppActions;
