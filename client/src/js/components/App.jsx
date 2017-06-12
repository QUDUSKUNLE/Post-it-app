import React from 'react'
import NavBar from './navBar'
import Home from './Home'
import SignUp from './userSignUp'
import SignIn from './userSignIn'
import BroadCastBoard from './userBroadCastBoard'
import CreateGroup from './userCreateGroup'
import AddMember from './userCreateGroup'
import { BrowserRouter as Router, Route, browserHistory, Link } from 'react-router-dom'


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
