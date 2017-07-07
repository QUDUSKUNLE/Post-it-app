import React from 'react';
import axios from 'axios';

/**
 * Represents SignUp Component.
 */
class SignUp extends React.Component {
	// SignUp constructor
  /**
     * @param {string} props inbuilt props.
     */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      conf_password: ''
    };
		// Bind signUp input fields
    this.onChange = this.onChange.bind(this);

		// Bind signUp form values
    this.onSubmit = this.onSubmit.bind(this);

		// Bimd Google+
    // this.onclick = this.onclick.bind(this);
  }

  // onclick() {
	//
	// }

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
      alert(`Hi ${userDetails.username}, ${response.data.message}`);
				// console.log(response.data);
				// console.log(userDetails);
      this.props.history.push('/signin');
    }).catch((error) => {
      if (error.response) {
					// console.log(error.response.data);
        alert(`Hey ${userDetails.username}, you've\n `
				`${error.response.data.message}.`);
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
						<div className='col-md-12'>
							<h3>Create an account</h3>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<label htmlFor='email'>Email</label>
									<input value={this.state.email} onChange={this.onChange}
										id='email' type="email"
										className="googleform" placeholder="johndoe@example.com"
										name='email' required />
								</div>
								<div className="form-group">
									<label htmlFor='username'>Username</label>
									<input value={this.state.username} onChange={this.onChange}
										id='username' type="text"
										className="googleform" placeholder="johndoe"
										name='username' required />
								</div>
								<div className="form-group">
									<label htmlFor='password'>Password</label>
									<input value={this.state.password} onChange={this.onChange}
										id='pass' type="password"
										className="googleform" placeholder="********"
										name='password' required />
								</div>
								<div className="form-group">
									<label htmlFor='conf_password'>Confirm Password</label>
									<input value={this.state.conf_password}
										onChange={this.onChange}
										id='conf_password' type="password"
										className="googleform" placeholder="********"
										name='conf_password' required />
								</div>
								<button type="submit"
									className="googleformbtn">Sign up
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default SignUp;
