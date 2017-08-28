import React from 'react';
import PropTypes from 'prop-types';
import { signupAction } from '../actions/signUpActions.js';
import { validatePassword } from '../utils/utils.js';

/**
  * Represents SignUp Component.
*/
export default class SignUp extends React.Component {
  /**
    * @param {string} props inbuilt props.
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
    // Bind signUp input fields
    this.onChange = this.onChange.bind(this);

    // Bind signUp form values
    this.onSubmit = this.onSubmit.bind(this);
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
  * onSubmit event
  * @param {object} e .
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
    if (validatePassword(this.state.password)) {
      this.setState({
        errMessage: 'Password is too low, at least 8 chaaracters'
      });
    } else if (this.state.password !== this.state.conf_password) {
      this.setState({
        errMessage: 'Password do not match'
      });
    } else {
      const user = {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      };
      // signupAction
      signupAction(user)
        .then(({ data }) => {
          this.setState({
            signupMessage: data.message
          });
          this.props.history.push('/signin');
        }, () => {
          this.setState({
            signupMessage: 'Error sign up user`s',
          });
        });
    }
  }

  /**
    * @override
  */
  render() {
    return (
      <div>
        <div className="col-md-5 col-md-offset-1">
          <div className="row">
            <div className="col-md-12 w3-card w3-white" id="signupform">
              <h4>Create an account</h4>
              <br />
              <div>
                <center>
                  <span>{this.state.signupMessage}</span>
                </center>
              </div>
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
