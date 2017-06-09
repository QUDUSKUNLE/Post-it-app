import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component{
	render(){
		return(
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
			</div>
		)
	}
}


export default NavBar;
