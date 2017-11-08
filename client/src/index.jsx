import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  browserHistory } from 'react-router-dom';
import Routes from './components/Routes';
import setAuthToken from '../src/helper/setAuthToken';
import './index.css';

/**
 * Contains Routes to all my components
 */
if (localStorage.user) {
  setAuthToken(JSON.parse(localStorage.getItem('user'))
    .stsTokenManager.accessToken);
}
ReactDOM.render(
  <Router history={browserHistory}>
    <Routes/>
  </Router>,
document.getElementById('app'));
