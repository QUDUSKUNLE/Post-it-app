import React from 'react';
import {
  BrowserRouter as Router,
  browserHistory,
  Route, Switch
} from 'react-router-dom';
import UserSignIn from './UserSignIn.jsx';
import UserCreateGroup from './UserCreateGroup.jsx';
import UserBroadCastBoard from './UserBroadCastBoard.jsx';
import UserAddMember from './UserAddMember.jsx';
import NavBar from './NavBar.jsx';
import UserResetPassword from './UserResetPassword.jsx';
import NotFound from './NotFound.jsx';

const Routes = () =>
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/"
        component={NavBar} />
      <Route path="/signin"
        component={UserSignIn} />
      <Route path="/passwordreset"
        component={UserResetPassword} />
      <Route path="/member"
        component={UserAddMember}/>
      <Route path="/broadcastboard"
        component={UserBroadCastBoard}/>
      <Route path="/group"
        component={UserCreateGroup}/>
      <Route path="*"
        component={NotFound} />
    </Switch>
  </Router>;

export default Routes;
