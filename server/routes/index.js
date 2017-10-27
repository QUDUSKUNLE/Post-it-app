import express from 'express';
import Users from '../controllers/Users';
import Groups from '../controllers/Groups';
import Messages from '../controllers/Messages';

/**
 * Creates express Router
 */
const Router = express.Router();

/**
 * Router for signup users to the application
 */
Router.post('/api/v1/signup', Users.signUp);

/**
 * Router for signin user to the application
 * Both { email and password }
 */
Router.post('/api/v1/signin', Users.signIn);

/**
 * Router for signin user to the application via Google account
 * Both { email and password }
 */
Router.post('/api/v1/google', Users.googleSignIn);

/**
 * Router for reset user password
 * Both { email }
 */
Router.post('/api/v1/passwordReset', Users.passwordReset);

/**
 * Router for sign out user from the application
 */
Router.post('/api/v1/signout', Users.signOut);

/**
 * Router for a signed in user to create groups in the application
 */
Router.post('/api/v1/createGroup', Groups.createGroup);

/**
 * Router to get a user groups
 */
Router.get('/api/v1/getgroups/:userId', Groups.getUsersGroups);

/**
 * Router for a registered user to add registered member to a group
 */
Router.post('/api/v1/addmember/:groupId', Groups.addMemberToGroup);

/**
 * Router for a signed user to get members of a group
 */
Router.get('/api/v1/getMembers/:groupId', Groups.getMembersOfGroup);

/**
 * Router for signed user to send message to a group
 */
Router.post('/api/v1/sendMessage/:groupId', Messages.sendMessageToGroup);

/**
 * Router for signed user to vew message in a group
 */
Router.get('/api/v1/getMessage/:groupId', Messages.getMessage);

/**
 * Router for a signed in user to add members to a group
 */
Router.get('/api/v1/getAllRegisteredUsers', Groups.getAllRegisteredUsers);

// export Router
export default Router;
