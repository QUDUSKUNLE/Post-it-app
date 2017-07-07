import React from 'react';
import axios from 'axios';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import config from '../vendors/vendors.jsx';
import '../../css/icon.css';


/**
 * Represents SignIn Component.
 */
class SignIn extends React.Component {
	// SignIn constructor
  /**
     * @param {string} props inbuilt props.
     */
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
  }

	/**
 * onChange event.
 * @param {object} signIn The first number.
 * @returns {void} bind input values to name.
 */
  onChange(signIn) {
    this.setState({
      [signIn.target.name]: signIn.target.value
    });
  }

	/**
	* onSubmit event.
	* @param {object} signIn .
	* @returns {void} .
	*/
  onSubmit(signIn) {
    signIn.preventDefault();
    const SignInDetails = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('/signin', SignInDetails).then((response) => {
      alert(response.data.message);
      this.props.history.push('/broadcastboard');
    }).catch((error) => {
      if (error.response) {
        alert(`User's Details ${error.response.data.message}.`);
      }
    });
  }

	/**
		 * @override
		 */
  authenticate() {
    firebase.initializeApp(config);
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken;
        const user = result.user;
        if (user) {
          firebase.auth().onAuthStateChanged(() => {
            this.props.history.push('/broadcastboard');
          });
        }
        console.log(token);
        console.log(user);
      });
  }
	/**
		 * @override
		 */
  render() {
    return (
			<div>
				<nav className="navbar navbar-inverse navabar-fixed-top"
					role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle"
								data-toggle="collapse" data-target=".navbar-collapse">
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
				<div className="container signin">
					<div className="row">
						<div className="col-md-6 col-md-offset-3">
							<div className="row">
								<button className='google'
									onClick={this.authenticate.bind(this)}>
									Sign in with Google+
								</button>
								<br/>
								<br/>
								<div className="text-center or"><b>OR</b></div>
								<form onSubmit={this.onSubmit} id="signinForm">
									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input value={this.state.email} onChange={this.onChange}
											id="email" type="email"
											className="googleform" placeholder="johndoe@example.com"
											name="email" required />
									</div>
									<div className="form-group">
										<label htmlFor="password">Password</label>
										<input id="password" type="password"
											value={this.state.password} onChange={this.onChange}
											className="googleform" placeholder="*********"
											name="password" required />
									</div>
									<button type="submit"
										className="googleformbtn">Sign in
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
    );
  }
}
// Export SignIn Form
export default SignIn;
