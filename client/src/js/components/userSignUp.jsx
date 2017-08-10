import React from 'react';
import axios from 'axios';

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
      username: '',
      password: '',
      conf_password: '',
      signupMessage: ''
    };
    this.onChange = this.onChange.bind(this); // Bind signUp input fields

    this.onSubmit = this.onSubmit.bind(this); // Bind signUp form values
  }

/**
  * onChange event.
  * @param {object} signUp The first number.
  * @returns {void} bind input values to name.
*/
  onChange(signUp) {
    this.setState({
      [signUp.target.name]: signUp.target.value
    });
  }

/**
  * onSubmit event.
  * @param {object} signUp .
  * @returns {void} .
*/
  onSubmit(signUp) {
    signUp.preventDefault();
    const userDetails = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    };
    axios.post('/signup', userDetails).then((response) => {
      if (response) {
        this.setState({
          signupMessage: `Hi ${userDetails.username}, ${response.data.message}`
        });
      }
      this.props.history.push('/signin');
    }).catch((error) => {
      if (error.response) {
        this.setState({
          signupMessage: error.response.data.message
        });
      }
    });
  }

	/**
    * @override
  */
  render() {
    return (
			<div>
				<div className="col-md-5 col-md-offset-1">
					<div className='row'>
						<div className='col-md-12 w3-card w3-white' id='signupform'>
							<h4>Create an account</h4>
              <br />
              <div>
                <center>
                  <span>{this.state.signupMessage}</span>
                </center>
              </div>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor='email'>Email
                    </label>
                    <input value={this.state.email} onChange={this.onChange}
										id='email' type="email"
										className="signinform inp" placeholder="johndoe@example.com"
										name='email' required />
                  </div>
                  <div className="form-group">
                    <label htmlFor='username'>Username</label>
                    <input value={this.state.username} onChange={this.onChange}
										id='username' type="text"
										className="signinform" placeholder="johndoe"
										name='username' required />
                  </div>
                  <div className="form-group">
                    <label htmlFor='password'>Password</label>
                    <input value={this.state.password} onChange={this.onChange}
										id='pass' type="password"
										className="signinform" placeholder="********"
										name='password' required />
                  </div>
                  <div className="form-group">
                    <label htmlFor='conf_password'>Confirm Password</label>
                    <input value={this.state.conf_password}
										onChange={this.onChange}
										id='conf_password' type="password"
										className="signinform" placeholder="********"
										name='conf_password' required />
                  </div>
                  <button type="submit" className="signinformbtn">Sign up
                  </button>
                </form>
              <br/>
              <p className='text-center'>By clicking "Sign up for Postit App",
                 you agree to our terms of service and privacy policy.</p>
						</div>
					</div>
				</div>
			</div>
    );
  }
}
