import groupMemberResponse from './groupMemberResponse.json';
import groupMessageResponse from './groupMessageResponse.json';
import groupResponse from './groupResponse.json';
import memberResponse from './memberResponse.json';
import registeredUsers from './registeredUsers.json';
import sendMessageResponse from './sendMessageResponse.json';
import signInResponse from './signInResponse.json';
import signUpResponse from './signUpResponse.json';
const passwordResetResponse = {
  message: 'Password reset email sent successfully!'
};

const signOutResponse = {
  message: 'User`s signed-out successfully'
};

const createGroupResponse = {
  message: 'Group created successfully'
};

const mockApiCall = {
  get(url) {
    if (url === '/api/v1/getgroups/userId') {
      return Promise.resolve(groupResponse);
    } else if (url === '/api/v1/getMembers/groupId') {
      return Promise.resolve(groupMemberResponse);
    } else if (url === '/api/v1/getMessage/groupId') {
      return Promise.resolve(groupMessageResponse);
    } else if (url === '/api/v1/getAllRegisteredUsers') {
      return Promise.resolve(registeredUsers);
    }
  },
  post(url) {
    if (url === '/api/v1/signup') {
      return Promise.resolve(signUpResponse);
    } else if (url === '/api/v1/signin') {
      return Promise.resolve(signInResponse);
    } else if (url === '/api/v1/passwordReset') {
      return Promise.resolve(passwordResetResponse);
    } else if (url === '/api/v1/createGroup') {
      return Promise.resolve(createGroupResponse);
    } else if (url === '/api/v1/signout') {
      return Promise.resolve(signOutResponse);
    } else if (url === '/api/v1/addmember/groupId') {
      return Promise.resolve(memberResponse);
    } else if (url === '/api/v1/sendMessage/groupId') {
      return Promise.resolve(sendMessageResponse);
    }
  }
};
export default mockApiCall;
