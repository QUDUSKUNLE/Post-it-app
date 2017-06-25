import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import SignInUser from '../actions/AppActions';
// import SignInForm  from './signInForm'

class SignIn extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
		// Bind input field values
		this.onChange = this.onChange.bind(this);

		// Bind Form values
		this.onSubmit = this.onSubmit.bind(this);
	};

	onChange(signIn) {
		this.setState({
			[signIn.target.name]: signIn.target.value
		});
	};

	onSubmit(signIn) {
		signIn.preventDefault();
		const SignInDetails = {
			email: this.state.email,
			password: this.state.password
		};
		axios.post('/signin', SignInDetails)
			.then((response) => {
				// const token = response.data.token;
				// const userToken = jwtDecode(token).userToken;
				// window.localStorage.setItem('token', token);
				// console.log(response.data);
				alert(response.data.message);
				this.props.history.push('/broadcastboard');
			})
			.catch((error) => {
				if (error.response) {
					// console.log(error.response.data);
					alert(`User's Details ${error.response.data.message}.`);
				}
			});
	};

	render() {

		return (
			<div>
				<nav className="navbar navbar-inverse navabar-fixed-top" role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to="/">
                PostIt<small>App</small>
              </Link>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav navbar-right">
								<li><Link to="/">Home</Link></li>
								<li className="active"><Link to="/signin">Sign in</Link></li>
							</ul>
						</div>
					</div>
        </nav>
				<div className="container">
					<div className="row">
	          <div className="col-md-6 col-md-offset-3">
	            <div className="row">
	              <form className="col-md-6 col-md-offset-3" onSubmit={this.onSubmit}>
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
	                <button type="submit" className="btn btn-success form-control">
	                  Sign in
	                </button>
	              </form>
	            </div>
	          </div>
	        </div>
				</div>
			</div>
		);
	}
};

// SignIn.propTypes = {
// 	SignInUser: PropTypes.func.isRequired
// };

export default SignIn;
