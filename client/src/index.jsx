import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  browserHistory, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import setAuthToken from '../src/helper/setAuthToken';
import UserSignIn from './components/UserSignIn';
import UserCreateGroup from './components/UserCreateGroup';
import UserBroadCastBoard from './components/UserBroadCastBoard';
import Home from './components/Home';
import Footer from './components/Footer';
import UserResetPassword from './components/UserResetPassword';
import NotFound from './components/NotFound';
import AuthenticateRoute
  from '../src/components/Authentication/AuthenticateRoute';
import './index.scss';

/**
 * Contains Routes to all my components
 */
if (localStorage.token) {
  setAuthToken(JSON.parse(localStorage.getItem('token')));
}
ReactDOM.render(
  <Router history={browserHistory}>
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/passwordreset" component={UserResetPassword} />
        <Route
          path="/broadcastboard"
          component={AuthenticateRoute(UserBroadCastBoard)}
        />
        <Route
          path="/group"
          component={AuthenticateRoute(UserCreateGroup)}
        />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </Router>,
document.getElementById('app'));
