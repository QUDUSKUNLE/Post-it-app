// AppActions
import axios from 'axios';
// import Validator from 'validator'
// // import jwtDecode from 'jwt-decode';
// import ActionTypes from '../constants/AppConstants.jsx';
// import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
//
// const AppActions = {
//   signup: () => {
//     axios.post('/user/signup')
//       .then(() => {
//         AppDispatcher.handleViewAction({
//           actionTypes: ActionTypes.SIGNUP_USER
//         });
//       })
//       .then(() => {
//         AppDispatcher.handleViewAction({
//           actionTypes: ActionTypes.SIGNUP_USER_FAILED,
//           error: 'Error sign in up'
//         });
//       });
//   }
// };

export const SignUpUser =
  (userData) => {
    axios.post('/user/signup', userData)
      .then((response) => {
        alert(`Hi ${userData.username}, ${response.data.message}`);
        console.log(response.data);
        console.log(userData);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          alert(`Hey ${userData.username},\
            you've ${error.response.data.message}.`);
        }
      });
  };
