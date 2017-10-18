import express from 'express';
import Users from '../controllers/Users';
import Groups from '../controllers/Groups';
import Messages from '../controllers/Messages';

const Router = express.Router();

Router.post('/api/v1/signup', Users.signUp);

Router.post('/api/v1/signin', Users.signIn);
Router.post('/api/v1/google', Users.googleSignIn);

Router.post('/api/v1/passwordReset', Users.passwordReset);
Router.post('/api/v1/signout', Users.signOut);

Router.post('/api/v1/createGroup', Groups.createGroup);
Router.get('/api/v1/getgroups/:userId', Groups.getUsersGroups);

Router.post('/api/v1/addmember/:groupId', Groups.addMemberToGroup);
Router.get('/api/v1/getMembers/:groupId', Groups.getMembersOfGroup);

Router.post('/api/v1/sendMessage/:groupId', Messages.sendMessageToGroup);
Router.get('/api/v1/getMessage/:groupId', Messages.getMessage);

Router.get('/api/v1/getAllRegisteredUsers', Groups.getAllRegisteredUsers);

Router.post('/api/v1/sendGeneralMessage', Messages.sendGeneralMessage);
Router.post('/api/v1/sendGroupMessage', Messages.sendGroupMessage);
Router.post('/api/v1/getGeneralMessage', Messages.getGeneralMessage);

// export Router
export default Router;
