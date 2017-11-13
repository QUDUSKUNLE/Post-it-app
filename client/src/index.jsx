import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  browserHistory } from 'react-router-dom';
import Routes from './components/Routes';
import './index.css';

/**
 * Contains Routes to all my components
 */
ReactDOM.render(
  <Router history={browserHistory}>
    <Routes/>
  </Router>,
document.getElementById('app'));
