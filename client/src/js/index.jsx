import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, browserHistory, Route, Link  } from 'react-router-dom'
import App from './components/app.jsx'
import SignIn from './components/userSignIn'
import CreateGroup from './components/userCreateGroup'
import BroadCastBoard from './components/userBroadcastBoard'
import AddMember from './components/userAddMember'

const store =  createStore(
	(state = {}) => state,
	applyMiddleware(thunk)
);

ReactDOM.render(
	<Provider store={store}>
		<Router history={ browserHistory }>
		  <div>
		    <Route exact path="/" component={App}/>
		    <Route path="/user/signin" component={SignIn} />
		    <Route path="/user/group" component={CreateGroup} />
		    <Route path="/user/broadcastboard" component={BroadCastBoard}/>
		    <Route path="/user/addmember" component={AddMember}/>
		  </div>
		</Router>
</Provider>, document.getElementById('app')
);
