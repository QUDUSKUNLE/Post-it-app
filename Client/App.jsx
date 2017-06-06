import React from 'react';
import Home from './components/Home';
import NavLink from './components/NavLink';
import { Link, IndexLink } from 'react-router-dom';

class App extends React.Component{
	render() {
		return (
			<div>
				<nav className="black-text" role="navigation">
					<div className="nav-wrapper">
						<Link to="/" className="brand-logo">PostIt<small>App</small></Link>
						<ul className="right hide-on-med-and-down">
							<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
							<li><NavLink to="/signup">userSignUp</NavLink></li>
							<li><NavLink to="/signin">userSignIn</NavLink></li>
						</ul>
					</div>
				</nav>
				{this.props.children || <Home />}
			</div>
		);
	}
};

export default App;
