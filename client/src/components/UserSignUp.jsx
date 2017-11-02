import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import SignUpStore from '../stores/SignUpStore';
import signUpAction from '../actions/SignUpActions.js';

/**
 * @description - renders SignUp Component
 * @class SignUp
 * @extends {React.Component}
 */
export default class UserSignUp extends React.Component {
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
      phoneNumber: '',
      confirmPassword: ''
    };

    /**
     * @description This binding is necessary to make `this` work
     * in the callback
     */
    this.onChange = this.onChange.bind(this);
    this.handleSignUpAction = this.handleSignUpAction.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    SignUpStore.on('SIGN_UP_SUCCESS', this.handleSignUpAction);
  }

  componentWillUnmount() {
    SignUpStore.removeListener('SIGN_UP_SUCCESS', this.handleSignUpAction);
  }
  /**
   * @description - onChange event
   * @param {object} event - event.
   * @returns {void} bind input values to name.
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description - this handles SignUp form submission
   * @param {event} event - event.
   * @returns {*} void
  */
  onSubmit(event) {
    event.preventDefault();
    signUpAction({ ...this.state });
  }

  /**
   * handleSignUpAction event
   * @returns {void} .
   */
  handleSignUpAction() {
    const response = SignUpStore.signUpUser();
    toastr.success(response.message);
    this.props.history.push('/signin');
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
                    <label htmlFor="email">
                      Email
                  </label>
                    <input
                      value={this.state.email}
                      onChange={this.onChange}
                      id="email" type="email"
                      className="signinform inp"
                      placeholder="johndoe@example.com"
                      name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">
                      Username
                  </label>
                    <input
                      value={this.state.username}
                      onChange={this.onChange}
                      id="username"
                      type="text"
                      className="signinform"
                      placeholder="johndoe"
                      name="username" required /></div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">
                      Phone Number
                  </label>
                    <input
                      value={this.state.phoneNumber}
                      onChange={this.onChange}
                      id="phoneNumber"
                      type="phone"
                      className="signinform"
                      placeholder="08012345678"
                      name="phoneNumber" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">
                      Password
                  </label>
                    <input
                      value={this.state.password}
                      onChange={this.onChange}
                      id="pass"
                      type="password"
                      className="signinform"
                      placeholder="********"
                      name="password" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">
                      Confirm Password
                  </label>
                    <input
                      value={this.state.confirmPassword}
                      onChange={this.onChange}
                      id="confirmPassword"
                      type="password"
                      className="signinform"
                      placeholder="********"
                      name="confirmPassword" required />
                  </div>
                  <button type="submit" className="signinformbtn">
                    Sign up
                </button>
                </form>
                <div className="text-center term">
                  By clicking "Sign up for Postit App",
                  you agree to our terms of service and privacy policy.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// props validation
UserSignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
};
