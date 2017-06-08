import React from 'react';

import { browserHistory, Link } from 'react-router-dom';

class SignIn extends React.Component{
	render() 
	{
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
								<input
									id="email" type="email"
									className="validate" placeholder="johndoe@example.com"
									name="email" required/>	
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>	
								<input id="password" type="password"
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

