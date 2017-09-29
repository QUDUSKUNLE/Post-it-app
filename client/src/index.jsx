import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, browserHistory, Route } from
  'react-router-dom';
import UserApp from './components/UserApp';
import UserSignIn from './components/UserSignIn';
import UserCreateGroup from './components/UserCreateGroup';
import UserBroadCastBoard from './components/UserBroadCastBoard';
import UserAddMember from './components/UserAddMember';
import UserResetPassword from './components/UserResetPassword';
import './css/icon.scss';


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
