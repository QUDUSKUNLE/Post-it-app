import ActionTypes from '../constants/AppConstants.jsx';
import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
//
const AppActions = {
//   signup: () => {
//     axios.post('/user/signup')
//       .then(() => {
  addMember(member) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.ADD_MEMBER,
      member: member
    });
  },
//       .then(() => {
  receiveMember(members) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.RECEIVE_MEMBER,
      member: members
    });
  }
//   }
};

export default AppActions;

// export const SignUpUser =
//   (userData) => {
//     axios.post('/user/signup', userData)
//       .then((response) => {
//         alert(`Hi ${userData.username}, ${response.data.message}`);
//         console.log(response.data);
//         console.log(userData);
//       })
//       .catch((error) => {
//         if (error.response) {
//           console.log(error.response.data);
//           alert(`Hey ${userData.username},\
//             you've ${error.response.data.message}.`);
//         }
//       });
//   };
