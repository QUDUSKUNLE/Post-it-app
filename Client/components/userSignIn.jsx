import React from 'react';

class SignIn extends React.Component {
	render() {

		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-md-offset-3">
							<form>
								<legend><i>Log in user</i></legend><br />
								<div className="form-group">
									<input type="email" name="" className="form-control" placeholder="johndoe@example.com" required />
								</div>
								<div className="form-group">
									<input type="password" name="" className="form-control" placeholder="************" required />
								</div>
								<button type="submit" className="btn btn-success form-control">Sign in</button>
								<br />
								<br />
								<button type="submit" className="btn btn-warning form-control">Back</button>
							</form>
						</div>
					</div>
				</div>
			</div>	
		);
	}
};

export default SignIn;
