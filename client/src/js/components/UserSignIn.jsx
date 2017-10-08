import React from 'react';
import GoogleButton from 'react-google-button';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import config from '../vendors/vendors.js';
import toastr from 'toastr';
import Footer from './Footer';
import SignInStore from '../stores/SignInStore';
import { signinAction, signInWithGoogle } from '../actions/signInActions.js';
// import { getAllUsers } from '../utils/utils.js';


/**
 * @description - renders SignIn Component
 * @class SignIn
 * @extends {React.Component}
 */
export default class UserSignIn extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userId: '',
      email: '',
      password: '',
      signinMessage: '',
      errMessage: '',
      loggedIn: false
    };
    // Bind input field values
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSignInAction = this.handleSignInAction.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  componentDidMount() {
    SignInStore.on('SIGN_IN_SUCCESS', this.handleSignInAction);
    SignInStore.on('SIGN_IN_ERROR', this.handleSignInAction);
  }

  compoenentWillUnmount() {
    SignInStore.removeListener('SIGN_IN_SUCCESS', this.handleSignInAction);
    SignInStore.removeListener('SIGN_IN_ERROR', this.handleSignInAction);
  }
  /**
   * onChange event
   * @param {object} event - event
   * @return {void} updated state of user
  */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description - this handles SignIn form submission
   * @param {object} event - event.
   * @returns {void} .
  */
  onSubmit(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    signinAction(user);
  }

  /**
   * @description This handles handleSignInAction
   * @param {object} user .
   * @returns {void} .
   */
  handleSignInAction() {
    const response = SignInStore.signInUser();
    if (response.message === 'User Signed in successfully') {
      toastr.success('User Signed in successfully');
      this.setState({
        userName: (Object.values((response.response)[0])[0].userName),
        loggedIn: true,
        email: this.state.email,
        userId: (Object.values((response.response)[0]))[0].userId
      });
      localStorage.setItem('userName', JSON.stringify(this.state.userName));
      localStorage.setItem('userIn', JSON.stringify(this.state.loggedIn));
      localStorage.setItem('Id', JSON.stringify(this.state.userId));
      localStorage.setItem('email', JSON.stringify(this.state.email));
      this.props.history.push('/broadcastboard');
    } else if (response.data.error.code === 'auth/wrong-password') {
      toastr.error(response.data.error.message);
    } else if (response.data.error.code === 'auth/user-not-found') {
      toastr.error(response.data.error.message);
    } else if (response.data.error.code === 'auth/invalid-email') {
      toastr.error(response.data.error.message);
    }
  }


  /**
   * @description - this handles Google SignIn Method
   * @param {object} event - event.
   * @returns {void} .
  */
  googleSignIn() {
    firebase.initializeApp(config);
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        signInWithGoogle(result)
          .then((res) => {
            this.setState({
              signinMessage: res.data.message,
              userName: res.data.user.displayName,
              loggedIn: true
            });
            toastr.success(this.state.signinMessage);
            localStorage.setItem('userName', JSON.stringify(this.state.userName));
            localStorage.setItem('userIn', JSON.stringify(this.state.loggedIn));
            this.props.history.push('/broadcastboard');
          });
      });
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {Object} SignIn component
   * @SignIn
   */
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navabar-fixed-top"
          role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed"
                data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button><Link className="navbar-brand" to="#">
                PostIt<small>App</small>
              </Link></div>
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
                <center>
                  <GoogleButton onClick={this.googleSignIn}/>
                </center>
                <br/>
                <div className="text-center or"><b>OR</b></div>
                <form onSubmit={this.onSubmit}
                  className="w3-card w3-white" id="signinForm">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input value={this.state.email} onChange={this.onChange}
                      id="email" type="email"
                      className="signinform" placeholder="johndoe@example.com"
                      name="email" required />
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="password">Password</label>
                      </div>
                      <div className="col-md-4 col-md-offset-4">
                        <Link to="/passwordreset">
                          <h6 className="pull-right create">
                            <b>Forgot password?</b></h6>
                        </Link>
                      </div>
                    </div>
                    <input id="password" type="password"
                      value={this.state.password} onChange={this.onChange}
                      className="signinform" placeholder="*********"
                      name="password" required />
                  </div>
                  <button type="submit" className="signinformbtn">Sign in
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
        <Footer/>
      </div>
    );
  }
}

// props validation
UserSignIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
};
