import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import resetPasswordAction from '../actions/resetPasswordAction';
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

  /**
   * @method componentDidMount
   * @description Adds an event Listener to the Store and fires
   * when the component is fully mounted.
   * @return { void} void
   * @memberof UserResetPassword
  */
  componentDidMount() {
    SignInStore.on('PASSWORD_RESET_SUCCESS', this.handlePasswordReset);
  }

  /**
   * @method componentWillUnmount
   * @description remove event Listener from the Store and fires.
   * @return {void} void
   * @memberof UserResetPassword
   */
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
    resetPasswordAction(resetEmail);
    this.setState({ email: '' });
  }

  /**
   * @description - This handles reset Password Action
   * @returns {Object} Object
   * @MemberOf Reset Password
   */
  handlePasswordReset() {
    const passwordResetResponse = SignInStore.passwordReset();
    this.setState({});
    toastr.success(passwordResetResponse.message);
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {*} ResetPassword component
   * @ResetPassword
   */
  render() {
    return (
      <div className="passwordreset">
        <h5 className="text-center">
          <b>Reset your password</b>
        </h5>
        <div className="container resetform">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 w3-card w3-white">
              <form onSubmit={this.onSubmit} id="resetform">
                <div className="form-group">
                  <label htmlFor="email">
                    Enter email
                  </label>
                  <input
                    value={this.state.email}
                    onChange={this.onChange}
                    id="email" type="email"
                    className="signinform" placeholder="johndoe@example.com"
                    name="email" required
                  />
                </div>
                <button
                  type="submit"
                  className="signinformbtn"
                >Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserResetPassword.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
};
