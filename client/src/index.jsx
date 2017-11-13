import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  browserHistory } from 'react-router-dom';
import Routes from './components/Routes.jsx';
import setAuthToken from '../src/helper/setAuthToken.js';
import './index.scss';

/**
 * Contains Routes to all my components
 */
if (localStorage.token) {
  setAuthToken(JSON.parse(localStorage.getItem('token')));
}
ReactDOM.render(
  <Router history={browserHistory}>
    <Routes/>
  </Router>,
document.getElementById('app'));
