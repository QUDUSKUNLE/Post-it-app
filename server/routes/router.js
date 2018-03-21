import express from 'express';

import UserController from '../controller/UserController';
import GroupController from '../controller/GroupController';
import MessageController from '../controller/MessageController';
import validateToken from '../middleware/validateToken';
import validateRequestBody from '../middleware/validateRequestBody';

/**
 * Creates express Router
 */
const router = express.Router();

/**
 * Route for signup users to the application
 */
router.post('/api/v1/signup',
  validateRequestBody,
  UserController.signUp
);

/**
 * Route to check if a username already exist
 */
router.post('/api/v1/checkuser',
  UserController.checkUser
);

/**
 * Route for signin user to the application
 * Both { email and password }
 */
router.post('/api/v1/signin',
  validateRequestBody,
  UserController.signIn
);

/**
 * Route for signin user to the application via Google account
 * Both { email and password }
 */
router.post('/api/v1/google',
  UserController.googleSignIn
);

/**
 * Route for reset user password
 * Both { email }
 */
router.post('/api/v1/passwordReset',
  validateRequestBody,
  UserController.passwordReset
);

/**
 * Route for sign out user from the application
 */
router.post('/api/v1/signout',
  UserController.signOut
);

/**
 * Route for a signed in user to create groups in the application
 */
router.post('/api/v1/createGroup',
  validateRequestBody,
  validateToken,
  GroupController.createGroup
);

/**
 * Route to get a user groups
 */
router.get('/api/v1/getGroups',
  validateToken,
  GroupController.getUsersGroups
);

/**
 * Route for a registered user to add registered member to a group
 */
router.post('/api/v1/addMember/:groupId',
  validateRequestBody,
  validateToken,
  GroupController.addMemberToGroup
);

/**
 * Route for a signed user to get members of a group
 */
router.get('/api/v1/getMembers/:groupId',
  validateToken,
  GroupController.getMembers
);

/**
 * Route for a signed user to send message to a group
 */
router.post('/api/v1/sendMessage/:groupId',
  validateToken,
  validateRequestBody,
  MessageController.sendMessageToGroup
);

/**
 * Route for signed user to vew message in a group
 */
router.get('/api/v1/getMessage/:groupId',
  validateToken,
  MessageController.getMessage
);

/**
 * Route for user to search users
 */
router.post('/api/v1/search',
  validateToken,
  UserController.searchUser
);

// export Router
export default router;
