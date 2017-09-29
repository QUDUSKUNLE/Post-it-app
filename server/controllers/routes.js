import express from 'express';
import Users from './Users';
import Groups from './Groups';
import Messages from './Messages';

const Router = express.Router();

Router.get('/*', Users.home);
Router.post('/signup', Users.signUp);

Router.post('/signin', Users.signIn);
Router.post('/google', Users.googleSignIn);

Router.post('/passwordReset', Users.passwordReset);
Router.post('/signout', Users.signOut);

Router.post('/userCreateNewGroup', Groups.createNewGroup);
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
