import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  browserHistory,
  Route, Switch } from 'react-router-dom';
import UserSignIn from './components/UserSignIn';
import UserCreateGroup from './components/UserCreateGroup';
import UserBroadCastBoard from './components/UserBroadCastBoard';
import UserAddMember from './components/UserAddMember';
import NavBar from './components/NavBar';
import UserResetPassword from './components/UserResetPassword';
import NotFound from './components/NotFound';
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
