import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, browserHistory, Route } from
  'react-router-dom';
import UserApp from './components/UserApp.jsx';
import UserSignIn from './components/UserSignIn.jsx';
import UserCreateGroup from './components/UserCreateGroup.jsx';
import UserBroadCastBoard from './components/UserBroadCastBoard.jsx';
import UserAddMember from './components/UserAddMember.jsx';
import UserResetPassword from './components/UserResetPassword.jsx';
import '../css/icon.scss';


const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <div>
        <Route exact path="/" component={UserApp}/>
        <Route path="/signin" component={UserSignIn} />
        <Route
          path="/broadcastboard"
          component={UserBroadCastBoard}
        />
        <Route
          path="/group"
          component={UserCreateGroup}
        />
        <Route
          path="/passwordreset"
          component={UserResetPassword}
        />
        <Route
          path="/member"
          component={UserAddMember}
        />
      </div>
    </Router>
  </Provider>, document.getElementById('app')
);
