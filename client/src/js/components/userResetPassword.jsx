import React from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../actions/resetPasswordActions.js';
import Footer from './Footer.jsx';
import toastr from 'toastr';
import SignInStore from '../stores/SignInStore.js';

/**
 * @description - renders ResetPassword Component
 * @class ResetPassword
 * @extends {React.Component}
 */
export default class ResetPassword extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      response: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePasswordReset = this.handlePasswordReset.bind(this);
  }

  componentDidMount() {
    SignInStore.on('PASSWORD_RESET_SUCCESS', this.handlePasswordReset);
    SignInStore.on('PASSWORD_RESET_ERROR', this.handlePasswordReset);
  }
  /**
 * onChange event.
 * @param {object} e The first number.
 * @returns {void} bind input values to name.
 */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
	 * @description This handles resetPassword form submission
	 * @param {object} e .
	 * @returns {void} .
	 */
  onSubmit(e) {
    e.preventDefault();
    const resetEmail = {
      email: this.state.email
    };
    resetPassword(resetEmail);
  }

  /**
   * @description - This handles reset Password Action
   * @returns {Object} Object
   * @MemberOf Reset Password
   */
  handlePasswordReset() {
    const passwordResetResponse = SignInStore.passwordReset();
    if (passwordResetResponse.message ===
      'Password reset email sent successfully!') {
      toastr.success(passwordResetResponse.message);
    } else if (passwordResetResponse.error.code === 'auth/user-not-found') {
      toastr.error(passwordResetResponse.error.message);
    } else if (passwordResetResponse.error.code === 'auth/invalid-email') {
      toastr.error(passwordResetResponse.error.message);
    }
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {Object} ResetPassword component
   * @ResetPassword
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
              </button>
              <Link className="navbar-brand" to="#">
                PostIt<small>App</small>
              </Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signin">Sign in</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="passwordreset">
          <center>
            <h4>
              Reset your password
            </h4>
          </center><br/>
          <div className="container resetform">
            <div className="row">
              <div className="col-md-6 col-md-offset-3 w3-card w3-white">
                <form onSubmit={this.onSubmit} id="resetform">
                  <div className="form-group">
                    <label htmlFor="email">
                      Enter your email address
                    </label>
                    <input value={this.state.email}
                      onChange={this.onChange}
                      id="email" type="email"
                      className="signinform" placeholder="johndoe@example.com"
                      name="email" required />
                  </div>
                  <button type="submit"
                    className="signinformbtn">Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
