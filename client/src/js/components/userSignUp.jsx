// signUp Component
import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios'



class SignUp extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username: '',
			password: '',
			conf_password: ''
		}
		// Bind signUp input fields
		this.onChange = this.onChange.bind(this);

		// Bind signUp form values
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(signUp) {
		this.setState({[signUp.target.name]: signUp.target.value})
	}

	// OnSubmit method
	onSubmit(signUp) {
		signUp.preventDefault();

		axios.post('/user/signup', this.state);
		console.log(this.state);
	}
	render() {

		return (
			<div>
					<div className="container">
						<div className="row">
							<div className='col-md-6'>
								<p>PostIt
									<small>
										<i>App</i>
									</small>
										&nbsp;allows friends to come together and share vital informtion
								</p>
							</div>
							<div className="col-md-5 col-md-offset-1">
								<div className='row'>
									<div className='col-md-12'>
										<h5>Create an account</h5>
										<form onSubmit={this.onSubmit}>
											<div className="form-group">
												<label for='email'>Email</label>
												<input value={this.state.email} onChange={this.onChange}
													id='email' type="email"
													className="form-control" placeholder="johndoe@example.com"
													name='email' required />
											</div>
											<div className="form-group">
												<label>Username</label>
												<input value={this.state.username} onChange={this.onChange}
													id='username' type="text"
													className="form-control" placeholder="johndoe"
													name='username' required />
											</div>
											<div className="form-group">
												<label>Password</label>
												<input value={this.state.password} onChange={this.onChange}
													id='pass' type="password"
													className="form-control" placeholder="********"
													name='password' required />
											</div>
											<div className="form-group">
												<label>Confirm Password</label>
												<input value={this.state.conf_password} onChange={this.onChange}
													id='conf_password' type="password"
													className="form-control" placeholder="********"
													name='conf_password' required />
											</div>
											<button type="submit" className="btn btn-success form-control">Sign up</button>
										</form>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
		)
	}
};



export default SignUp;
