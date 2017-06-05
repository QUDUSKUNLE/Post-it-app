import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import ComponentItems from './components/componentList';
import SignUp from './components/userSignUp';
import SignIn from './components/userSignIn';
import AddMember from './components/userAddMember';
import BroadCastBoard from './components/userBroadCastBoard';
import Footer from './components/footer';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

class App extends React.Component {
	render() {
		return (
			<div>
				<Navbar />
				<ComponentItems />
				<SignUp />
				<SignIn />
				<AddMember />
				<BroadCastBoard />
				<Footer />
			</div>	
		);
	}
}

export default App;


ReactDOM.render(<App />, document.getElementById('app'));
