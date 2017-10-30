import React from 'react';
import toastr from 'toastr';
import { Link } from 'react-router-dom';
import resetPassword from '../actions/resetPasswordActions';
import Footer from './Footer';
import SignInStore from '../stores/SignInStore';

/**
 * @description - renders ResetPassword Component
 * @class ResetPassword
 * @extends {React.Component}
 */
export default class UserResetPassword extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props -
   */
  constructor(props) {
    super(props);
    this.state = { email: '' };

    /**
     * @description This binding is necessary to make `this` work
     * in the callback
     */
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePasswordReset = this.handlePasswordReset.bind(this);
  }

  componentDidMount() {
    SignInStore.on('PASSWORD_RESET_SUCCESS', this.handlePasswordReset);
  }

  componentWillUnmount() {
    SignInStore.removeListener('PASSWORD_RESET_SUCCESS',
      this.handlePasswordReset);
  }

  /**
   * onChange event.
   * @param {object} event The first number.
   * @returns {void} bind input values to name.
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
	 * @description This handles resetPassword form submission
	 * @param {object} event .
	 * @returns {void} .
	 */
  onSubmit(event) {
    event.preventDefault();
    const resetEmail = { email: this.state.email };
    resetPassword(resetEmail);
  }

  /**
   * @description - This handles reset Password Action
   * @returns {Object} Object
   * @MemberOf Reset Password
   */
  handlePasswordReset() {
    const passwordResetResponse = SignInStore.passwordReset();
    toastr.success(passwordResetResponse.message);
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
                <li><Link to="/">Home</Link></li>
                <li><Link to="/signin">Sign in</Link></li>
                <li className="active">
                  <Link to="/passwordreset">PasswordReset</Link>
                </li>
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
