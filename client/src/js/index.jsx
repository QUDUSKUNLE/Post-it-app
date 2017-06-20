import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import { BrowserRouter as Router, browserHistory, Route, Link  } from 'react-router-dom';
import SignIn from './components/UserSignIn';
import CreateGroup from './components/UserCreateGroup';
import BroadCastBoard from './components/UserBroadcastBoard';
import AddMember from './components/UserAddMember';

ReactDOM.render(
	<Router history={ browserHistory }>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/user/signin" component={SignIn} />
      <Route path="/user/group" component={CreateGroup} />
      <Route path="/user/broadcastboard" component={BroadCastBoard}/>
      <Route path="/user/addmember" component={AddMember}/>
    </div>
  </Router>, document.getElementById('app')
);
