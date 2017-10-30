import express from 'express';
import UserController from '../controllers/userController';
import GroupController from '../controllers/groupController';
import MessageController from '../controllers/messageController';

/**
 * Creates express Router
 */
const Router = express.Router();

/**
 * Router for signup users to the application
 */
Router.post('/api/v1/signup', UserController.signUp);

/**
 * Router for signin user to the application
 * Both { email and password }
 */
Router.post('/api/v1/signin', UserController.signIn);

/**
 * Router for signin user to the application via Google account
 * Both { email and password }
 */
Router.post('/api/v1/google', UserController.googleSignIn);

/**
 * Router for reset user password
 * Both { email }
 */
Router.post('/api/v1/passwordReset', UserController.passwordReset);

/**
 * Router for sign out user from the application
 */
Router.post('/api/v1/signout', UserController.signOut);

/**
 * Router for a signed in user to create groups in the application
 */
Router.post('/api/v1/createGroup', GroupController.createGroup);

/**
 * Router to get a user groups
 */
Router.get('/api/v1/getgroups/:userId', GroupController.getUsersGroups);

/**
 * Router for a registered user to add registered member to a group
 */
Router.post('/api/v1/addmember/:groupId', GroupController.addMemberToGroup);

/**
 * Router for a signed user to get members of a group
 */
Router.get('/api/v1/getMembers/:groupId', GroupController.getMembersOfGroup);

/**
 * Router for a signed user to send message to a group
 */
Router.post('/api/v1/sendMessage/:groupId',
  MessageController.sendMessageToGroup);

/**
 * Router for signed user to vew message in a group
 */
Router.get('/api/v1/getMessage/:groupId', MessageController.getMessage);

/**
 * Router for a signed in user to add members to a group
 */
Router.get('/api/v1/getAllRegisteredUsers',
  GroupController.getAllRegisteredUsers);

// export Router
export default Router;
