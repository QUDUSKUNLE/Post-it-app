import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/icon.css';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      response: {}
    };
  }
  /**
 * onChange event.
 * @param {object} passwordreset The first number.
 * @returns {void} bind input values to name.
 */
  onChange(passwordreset) {
    this.setState({
      [passwordreset.target.name]: passwordreset.target.value
    });
  }

	/**
	* onSubmit event.
	* @param {object} passwordreset .
	* @returns {void} .
	*/
  onSubmit(passwordreset) {
    passwordreset.preventDefault();
    const reset = {
      email: this.state.email,
    };
    // console.log(reset);
    axios.post('/passwordreset', reset)
      .then((res) => {
        const mess = res.data.message;
        console.log(mess);
        alert(mess);
        this.props.history.push('/signin');
      }).catch((error) => {
        if (error.response) {
          const er = `User's Details ${error.response.data.message}.`;
          console.log(er);
          alert(er);
        }
      });
  }

  /**
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
							<Link className="navbar-brand" to="/">
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
        <div className='passwordreset'>
          <center>
            <h4>
              Reset your password
            </h4>
            <span className='help-block'>{this.props.response}</span>
          </center><br/>
            <div className='container resetform'>
              <div className='row'>
                <div className='col-md-6 col-md-offset-3 w3-card w3-white'>
                  <form onSubmit={this.onSubmit.bind(this)} id="resetform">
                    <div className="form-group">
                    <label htmlFor="email">
                      Enter your email address
                    </label>
                    <input value={this.state.email}
                      onChange={this.onChange.bind(this)}
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
      </div>
    );
  }
}

export default ResetPassword;
