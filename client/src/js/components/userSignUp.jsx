import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import SignUpStore from '../stores/SignUpStore.js';
import { signupAction } from '../actions/signUpActions.js';

/**
 * @description - renders SignUp Component
 * @class SignUp
 * @extends {React.Component}
 */
export default class SignUp extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
      signupMessage: '',
      errMessage: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleSignUpAction = this.handleSignUpAction.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    SignUpStore.on('SIGN_UP_SUCCESS', this.handleSignUpAction);
    SignUpStore.on('SIGN_UP_ERROR', this.handleSignUpAction);
  }
  /**
   * @description - onChange event
   * @param {object} e - event.
   * @returns {void} bind input values to name.
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * @description - this handles SignUp form submission
   * @param {object} e - event.
   * @returns {void} .
  */
  onSubmit(e) {
    e.preventDefault();
    this.setState({
      email: this.state.email,
      password: this.state.password,
      confIrmPassword: this.state.confirmPassword,
      username: this.state.username
    });
    const user = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      username: this.state.username
    };
    signupAction(user);
  }

  /**
   * handleSignUpAction event
   * @returns {void} .
   */
  handleSignUpAction() {
    const response = SignUpStore.signUpUser();
    if (response.message === 'Registration successful and' +
    ' verification email sent to your email') {
      toastr.success(response.message);
      this.props.history.push('/signin');
    } else if (response.data.error.code === 'auth/email-already-in-use') {
      toastr.error(response.data.error.message);
    } else if (response.data.error.code === 'password should be at least 6' +
      ' characters with a speacial character') {
      toastr.error(response.data.error.code);
    } else if (response.data.error.code === 'Password does not match') {
      toastr.error(response.data.error.code);
    } else if (response.data.error.code === 'Username required at' +
    ' least 2 characters') {
      toastr.error(response.data.error.code);
    }
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {Object} SignUp component
   * @SignUp
   */
  render() {
    return (
      <div>
        <div className="col-md-5 col-md-offset-1">
          <div className="row">
            <div className="col-md-12 w3-card w3-white" id="signupform">
              <h4>Create an account</h4>
              <br />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email
                  </label>
                  <input value={this.state.email} onChange={this.onChange}
                    id="email" type="email"
                    className="signinform inp" placeholder="johndoe@example.com"
                    name="email" required /></div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input value={this.state.username} onChange={this.onChange}
                    id="username" type="text"
                    className="signinform" placeholder="johndoe"
                    name="username" required /></div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input value={this.state.password} onChange={this.onChange}
                    id="pass" type="password"
                    className="signinform" placeholder="********"
                    name="password" required /></div>
                <div className="form-group">
                  <label htmlFor="conf_password">Confirm Password</label>
                  <input value={this.state.confirmPassword}
                    onChange={this.onChange}
                    id="confirmPassword" type="password"
                    className="signinform" placeholder="********"
                    name="confirmPassword" required /></div>
                <button type="submit" className="signinformbtn">Sign up</button>
              </form>
              <br/>
              <p className="text-center">By clicking "Sign up for Postit App",
                 you agree to our terms of service and privacy policy.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// props validation
SignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
};
