import React from 'react';
import GoogleButton from 'react-google-button';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import config from '../vendors/vendors.js';
import toastr from 'toastr';
import { signinAction, signInWithGoogle } from '../actions/signInActions.js';
// import { getAllUsers } from '../utils/utils.js';


/**
 * @description - renders SignIn Component
 * @class SignIn
 * @extends {React.Component}
 */
export default class SignIn extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      signinMessage: '',
      errMessage: {},
      loggedIn: false
    };
    // Bind input field values
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  /**
   * onChange event
   * @param {object} e - event
   * @return {void} updated state of user
  */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * @description - this handles SignIn form submission
   * @param {object} e - event.
   * @returns {void} .
  */
  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    /**
     * @description This handles SignInAction
     * @param {object} user .
     * @returns {void} .
     */
    signinAction(user)
      .then(({ data }) => {
        this.setState({
          signinMessage: data.message,
          userName: (Object.values((data.response[1]))[0].userName),
          loggedIn: true
        });
        toastr.success(this.state.signinMessage);
        localStorage.setItem('userName', JSON.stringify(this.state.userName));
        localStorage.setItem('userIn', JSON.stringify(this.state.loggedIn));
        this.props.history.push('/broadcastboard');
      }, (error) => {
        if (error.response) {
          this.setState({
            signinMessage: error.response.data.error.message
          });
        }
        toastr.error(this.state.signinMessage);
      });
    this.setState({
      email: '',
      password: ''
    });
  }

  /**
   * @description - this handles Google SignIn Method
   * @param {object} e - event.
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
            localStorage.setItem('userName',
              JSON.stringify(this.state.userName));
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
          <div className="container">
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
      </div>
    );
  }
}

// props validation
SignIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
};
