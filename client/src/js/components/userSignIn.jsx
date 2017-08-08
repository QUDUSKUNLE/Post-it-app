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
  /**
    * @param {string} props inbuilt props.
  */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signinMessage: ''
    };

    this.onChange = this.onChange.bind(this); // Bind input field values

    this.onSubmit = this.onSubmit.bind(this); // Bind Form values
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
      if (response) {
        this.setState({
          signinMessage: response.data.message
        });
      }
      this.props.history.push('/broadcastboard');
    }).catch((error) => {
      if (error.response) {
        this.setState({
          signinMessage: `User details ${error.response.data.message}`
        });
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
							<button type="button" className="navbar-toggle collapsed"
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
								<button id='google'
									onClick={this.authenticate.bind(this)}>
									Sign in with Google+
								</button>
								<br/>
								<br/>
								<div className="text-center or"><b>OR</b></div>
                <div>
                  <center>
                    <span>{this.state.signinMessage}</span>
                  </center>
                </div>
								<form onSubmit={this.onSubmit}
									className='w3-card w3-white' id="signinForm">
									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input value={this.state.email} onChange={this.onChange}
											id="email" type="email"
											className="signinform" placeholder="johndoe@example.com"
											name="email" required />
									</div>
									<div className="form-group">
										<div className='row'>
                      <div className='col-md-4'>
												<label htmlFor="password">Password
												</label>
											</div>
											<div className='col-md-4 col-md-offset-4'>
                        <Link to="/passwordreset">
												<h6 className='pull-right create'>
													<b>Forgot password?</b></h6>
												</Link>
											</div>
										</div>
										<input id="password" type="password"
											value={this.state.password} onChange={this.onChange}
											className="signinform" placeholder="*********"
											name="password" required />
									</div>
									<button type="submit"
										className="signinformbtn">Sign in
									</button>
								</form>
							</div>
							<br/>
							<div>
								<center>
                <p>New to PostIt App? <Link to="/" className="create">
								Create an account.</Link>
							</p>
							</center>
							</div>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default SignIn; // Export SignIn Form
