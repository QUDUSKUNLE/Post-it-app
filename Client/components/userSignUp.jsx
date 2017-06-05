// signUp Component
import React from 'react';

class SignUp extends React.Component {
	render() {
		return (
			<div>
				<div className="container">
					<div className="col-md-6 col-md-offset-3">
						<legend><i>Create an account</i></legend>
						<form>
							<div className="form-group">
								<label>Email</label>
								<input type="email" className="form-control" placeholder="johndoe@example.com" required />
							</div>
							<div className="form-group">
								<label>Username</label>
								<input type="text" className="form-control" placeholder="johndoe" required />
							</div>
							<div className="form-group">
								<label>Password</label>
								<input type="password" className="form-control" placeholder="************" required />
							</div>
							<div className="form-group">
								<label>Confirm Password</label>
								<input type="password" className="form-control" placeholder="************" required />
							</div>
							<button type="submit" className="btn btn-success form-control">Sign up</button>
							<br /><br />
							<button type="submit" className="btn btn-warning form-control">Back</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default SignUp;
