import React from 'react'
import NavBar from './NavBar'
import Home from './Home'
import SignUp from './UserSignUp'
import SignIn from './UserSignIn'
import BroadCastBoard from './UserBroadCastBoard'
import CreateGroup from './UserCreateGroup'
import AddMember from './UserCreateGroup'
import { BrowserRouter as Router, Route, browserHistory, Link } from 'react-router-dom'
//
// import { Provider } from 'react-redux'
// import thunk from "redux-thunk"
// import { createStore, applyMiddleware } from 'redux'


class App extends React.Component{
	render() {
		return (
				<Router history={browserHistory}>
	        <div>
	          <NavBar />
	          <Route exact path="/" component={Home}/>
	          <Route path="/user/signin" component={SignIn} />
	          <Route path="/user/signup" component={SignUp} />
	          <Route path="/user/group" component={CreateGroup} />
	          <Route path="/user/broadcastboard" component={BroadCastBoard} />
	        </div>
				</Router>
		);
	}
};

export default App;
