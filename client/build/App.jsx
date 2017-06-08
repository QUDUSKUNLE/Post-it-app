import React from 'react'
import Home from '../src/components/Home'
import SignUp from '../src/components/userSignUp'
import SignIn from '../src/components/userSignIn'
import BroadCastBoard from '../src/components/userBroadCastBoard'
import CreateGroup from '../src/components/userCreateGroup'
import AddMember from '../src/components/userCreateGroup'
import { BrowserRouter as Router, Switch, Redirect, Route, Link, browserHistory } from 'react-router-dom'


class App extends React.Component{
	
	render() {
		let styling = 'margin-top: 320px';
		return (
			<Router history={ browserHistory}>
				<div>
					<nav className="black-text" role="navigation">
						<div className="nav-wrapper">
							<Link to="/" className="brand-logo">PostIt<small>App</small></Link>
							<ul className="right">
								<li><Link to="/">Home</Link></li>
								<li><Link to="/user/signup">Sign up</Link></li>
								<li><Link to="/user/signin">Sign in</Link></li>
								<li><Link to="/user/broadcastboard">Broadcast Board</Link></li>
								<li><Link to="/user/group">Create Group</Link></li>
							</ul>
						</div>
					</nav>
					<Route exact path="/" component={Home} />
					<Route path="/user/signup" component={SignUp} />
					<Route path="/user/signin" component={SignIn} />
					<Route path="/user/broadcastboard" component={BroadCastBoard} />
					<Route path="/user/group" component={CreateGroup} />
				</div>
			</Router>
		);
	}
};

export default App;
