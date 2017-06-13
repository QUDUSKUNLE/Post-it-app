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

	onChange(signIn) {
		this.setState({[signIn.target.name]: signIn.target.value})
	}

	onSubmit(signIn) {
		signIn.preventDefault();
		axios.post('/user/signin', { user: this.state });
		console.log(this.state);
	}
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-md-offset-3">
							<div className="row">
								<form className="col-md-6 col-md-offset-3" onSubmit={this.onSubmit}>
									<h5>Sign in</h5>
									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input value={this.state.email} onChange={this.onChange}
											id="email" type="email"
											className="form-control" placeholder="johndoe@example.com"
											name="email" required />
									</div>
									<div className="form-group">
										<label htmlFor="password">Password</label>
										<input id="password" type="password"
											value={this.state.password} onChange={this.onChange}
											className="form-control" placeholder="*********"
											name="password" required />
									</div>
									<Link to="/user/broadcastboard"><button type="submit" className="btn btn-success form-control" name="action">Sign in</button></Link>
								</form>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
};




export default SignIn;
