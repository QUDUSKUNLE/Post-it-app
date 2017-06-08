import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

class SignIn extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
		// Bind input field values
		this.onChange = this.onChange.bind(this);

		// Bind Form values
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onChange(ee) {
		this.setState({[ee.target.name]: ee.target.value})
	}

	onSubmit(ee) {
		ee.preventDefault();
		axios.post('/user/signin', { user: this.state });
		console.log(this.state);
	}
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<h4 className="center">Sign In</h4>
					</div>
					<div className="row">	
						<form className="col s6 offset-s3" onSubmit={this.onSubmit}>
							<div className="form-group">
								<label htmlFor="email">Email</label>	
								<input value={this.state.email} onChange={this.onChange}
									id="email" type="email"
									className="validate" placeholder="johndoe@example.com"
									name="email" required/>	
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>	
								<input id="password" type="password"
									value={this.state.password} onChange={this.onChange}
									className="validate" placeholder="*********"
									name="password" required/>
							</div>
							<button type="submit" className="btn btn-success col s12" name="action">Sign in</button>
							<br /> <br />
							<Link to="/"><button type="btn" className="btn btn-success col s12">Back</button></Link>
						</form>
					</div>
				</div>
			</div>
		);
	}
};




export default SignIn;

