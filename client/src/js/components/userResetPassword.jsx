import React from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../actions/resetPasswordActions.js';
import '../../css/icon.css';
import Footer from './footer.jsx';

/**
  * Represents PasswordReset component.
*/
export default class ResetPassword extends React.Component {
  /**
    * @param {string} props inbuilt props.
  */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      respons: ''
    };
    this.onChange = this.onChange.bind(this);
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
	* onSubmit event.
	* @param {object} e .
	* @returns {void} .
	*/
  onSubmit(e) {
    e.preventDefault();
    const resetEmail = {
      email: this.state.email,
    };

    resetPassword(resetEmail)
      .then((res) => {
        const mess = res.data.message;
        this.setState({
          respons: mess
        });
      }).catch((err) => {
        if (err.response) {
          const er = `User's Details ${err.response.data.message}.`;
          this.setState({
            respons: er
          });
        }
      });
  }

  /*
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
                <center>
                  <span>{this.state.respons}</span>
                </center>
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
                    className="signinformbtn">Send password reset email
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
