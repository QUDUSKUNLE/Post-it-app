// signUp Component
import React from 'react';
import { Link} from 'react-router-dom'
// import authentication


class SignUp extends React.Component{
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col s6 offset-s3">
							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<label>Email</label>	
									<input type="email" className="form-control" ref={(email)=>this.email = email} placeholder="johndoe@example.com"/>
								</div>
								<div className="form-group">
									<label>Username</label>
									<input type="text" className="form-control" ref={(username)=>this.username = username} placeholder="johndoe" />
								</div>
								<div className="form-group">
									<label>Password</label>
									<input type="password" className="form-control" ref={(password)=>this.password=password} placeholder="************"/>
								</div>
								<div className="form-group">
									<label>Confirm Password</label>
									<input type="password" className="form-control" placeholder="************" />
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
