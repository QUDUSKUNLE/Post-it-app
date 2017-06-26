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
