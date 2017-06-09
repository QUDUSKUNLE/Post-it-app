// signUp Component
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import authentication


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

	onSubmit(signUp) {
		signUp.preventDefault();
		axios.post('/user/signup', { user: this.state });
		console.log(this.state);
	}
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col s6 offset-s3">
							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<label>Email</label>	
									<input value={this.state.email} onChange={this.onChange}
										id='email' type="email"
										className="validate" placeholder="johndoe@example.com"
										name='email' required/>
								</div>
								<div className="form-group">
									<label>Username</label>
									<input value={this.state.username} onChange={this.onChange}
										id='username' type="text"
										className="validate" placeholder="johndoe"
										name='username' required/>
								</div>
								<div className="form-group">
									<label>Password</label>
									<input value={this.state.password} onChange={this.onChange}
										id='pass' type="password"
										className="validate" placeholder="********"
										name='password' required/>
								</div>
								<div className="form-group">
									<label>Confirm Password</label>
									<input value={this.state.conf_password} onChange={this.onChange}
										id='conf_password' type="password"
										className="validate" placeholder="********"
										name='conf_password' required/>
								</div>
								<button type="submit" className="btn btn-success col s12">Sign up</button>
								<br /> <br />
								<Link to="/"><button type="btn" className="btn btn-success col s12">Back</button></Link>
							</form>
						</div>	
					</div>	
					
				</div>
			</div>
		)
	}
};

export default SignUp;
