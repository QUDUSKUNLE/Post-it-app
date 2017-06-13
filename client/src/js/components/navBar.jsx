import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component{
	render(){
		return(
			<div>
				<div className="navbar navbar-default" role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link to="/" className="navbar-brand">PostIt<small>App</small></Link>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav">
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<li><Link to="/">Home</Link></li>
								<li><Link to="/user/signin">Sign in</Link></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default NavBar;
