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
				<nav className="black-text" role="navigation">
					<div className="nav-wrapper">
						<Link to="/" className="brand-logo">PostIt<small>App</small></Link>
						<ul className="right">
							<li><Link to="">Home</Link></li>
							<li><Link to="/user/signup">Sign up</Link></li>
							<li><Link to="/user/signin">Sign in</Link></li>
							<li><Link to="/user/broadcastboard">Broadcast Board</Link></li>
							<li><Link to="/user/group">Create Group</Link></li>
						</ul>
					</div>
				</nav>
				<Route exact path="/" component={Home}/>
      			<Route path="/user/signin" component={SignIn}/>
      			<Route path="/user/signup" component={SignUp}/>
				<Route path="/user/group" component={CreateGroup}/>
      			<Route path="/user/broadcastboard" component={BroadCastBoard}/>
			</div>
			</Router>
		);
	}
};

export default App;
