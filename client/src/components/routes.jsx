import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'

import App from '../../build/App'
import SignUp from './userSignUp';
import SignIn from './userSignIn';


let routes = (
	<Router>
		<Route path="/" component={App} />
		<Route path="/signup" component={SignUp} />
		<Route path="/signin" component={SignIn} />
	</Router>
);

export default routes;
