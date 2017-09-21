import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import SignUpStore from '../stores/SignUpStore.js';
import { signupAction } from '../actions/signUpActions.js';
import { validatePassword } from '../utils/utils.js';

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
      conf_password: '',
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
      conf_password: this.state.conf_password,
      username: this.state.username
    });
    if (!validatePassword(this.state.password)) {
      toastr.error('Incorrect password');
    } else if (this.state.password !== this.state.conf_password) {
      toastr.error('Password does not match');
    } else {
      const user = {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      };
      signupAction(user);
    }
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
                  <input value={this.state.conf_password}
                    onChange={this.onChange}
                    id="conf_password" type="password"
                    className="signinform" placeholder="********"
                    name="conf_password" required /></div>
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
