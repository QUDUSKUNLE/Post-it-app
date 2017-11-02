import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  browserHistory,
  Route, Switch } from 'react-router-dom';
import UserSignIn from './components/UserSignIn.jsx';
import UserCreateGroup from './components/UserCreateGroup.jsx';
import UserBroadCastBoard from './components/UserBroadCastBoard.jsx';
import UserAddMember from './components/UserAddMember.jsx';
import NavBar from './components/NavBar.jsx';
import UserResetPassword from './components/UserResetPassword.jsx';
import NotFound from './components/NotFound.jsx';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={NavBar}/>>
      <Route path="/signin" component={UserSignIn} />
      <Route path="/passwordreset" component={UserResetPassword}/>
      <Route path="/member" component={UserAddMember}/>
      <Route path="/broadcastboard" component={UserBroadCastBoard}/>
      <Route path="/group" component={UserCreateGroup}/>
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>, document.getElementById('app')
);
