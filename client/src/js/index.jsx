import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, browserHistory, Route } from
  'react-router-dom';
import App from './components/userApp.jsx';
import SignIn from './components/userSignIn.jsx';
import CreateGroup from './components/userCreateGroup.jsx';
import BroadCastBoard from './components/userBroadCastBoard.jsx';
import AddMember from './components/userAddMember.jsx';
import ResetPassword from './components/userResetPassword.jsx';


const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/signin" component={SignIn} />
        <Route path="/broadcastboard" component={BroadCastBoard}/>
        <Route path="/group" component={CreateGroup} />
        <Route path="/passwordreset" component={ResetPassword} />
        <Route path="/member" component={AddMember}/>
      </div>
    </Router>
  </Provider>, document.getElementById('app')
);
