import express from 'express';
import Users from '../controllers/Users';
import Groups from '../controllers/Groups';
import Messages from '../controllers/Messages';

const Router = express.Router();

Router.get('/*', Users.home);
Router.post('/signup', Users.signUp);

Router.post('/signin', Users.signIn);
Router.post('/google', Users.googleSignIn);

Router.post('/passwordReset', Users.passwordReset);
Router.post('/signout', Users.signOut);

Router.post('/createGroup', Groups.userCreateNewGroup);
// Create group
Router.post('/create', Groups.createGroup);
Router.get('/getgroups/:userId', Groups.getUsersGroups);
Router.post('/addmember/:groupId', Groups.addMemberToGroup);
Router.post('/sendMessage/:groupId', Messages.sendMessageToGroup);
Router.get('/getMessage/:groupId', Messages.getMessage);

Router.post('/getUserGroups', Groups.getUserGroups);
Router.post('/getAllUsers', Groups.getAllUsers);

Router.post('/getGroupMember', Groups.getGroupMembers);
Router.post('/group/member', Groups.addGroupMember);

Router.post('/sendGeneralMessage', Messages.sendGeneralMessage);
Router.post('/sendGroupMessage', Messages.sendGroupMessage);

Router.post('/getGeneralMessage', Messages.getGeneralMessage);
Router.post('/getGroupMessage', Messages.getGroupMessage);


// export Router
export default Router;
