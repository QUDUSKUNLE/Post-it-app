import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

/**
 * Represents CreateGroup Component.
 */
class CreateGroup extends React.Component {
	// CreateGroup constructor
  /**
     * @param {string} props inbuilt props.
     */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      group: '',
    };
		// Bind Create Group Input Fields
    this.onChange = this.onChange.bind(this);

		// Bind to Create Group Form
    this.onSubmit = this.onSubmit.bind(this);

    this.onClick = this.onClick.bind(this);
  }

	/**
	* onChange event.
	* @param {object} createGroup no parameter.
	* @returns {void} bind input data to name.
	*/
  onChange(createGroup) {
    this.setState({ [createGroup.target.name]: createGroup.target.value });
  }

	/**
 * onClick event.
 * @param {void} nil no parameter.
 * @returns {object} response from server.
 */
  onClick() {
    axios.post('/signout').then((response) => {
      alert(response.data.message);
				// console.log(response.data);
      this.props.history.push('/');
    }).catch((error) => {
      if (error.response) {
					// console.log(error.response.data);
      }
    });
  }

	/**
	* onSubmit event.
	* @param {object} createGroup .
	* @returns {void} .
	*/
  onSubmit(createGroup) {
    createGroup.preventDefault();
    const groupDetails = {
      email: this.state.email,
      password: this.state.password,
      group: this.state.group
    };
    axios.post('/group', groupDetails).then(() => {
				// console.log(response.data);
      alert(`${groupDetails.group} group created successfully!!!`);
      this.props.history.push('/broadcastboard');
    }).catch((error) => {
      if (error.response) {
					// console.log(error.response.data)
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
							<button type="button" className="navbar-toggle"
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
							<ul className="nav navbar-nav">
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<li><Link to="/">Home</Link></li>
								<li><Link to="/broadcastboard">ChatRoom</Link></li>
								<li className="active"><Link to="">Create Group</Link></li>
								<li onClick={this.onClick}><Link to="">Sign Out</Link></li>
							</ul>
						</div>
					</div>
        </nav>
				<div className="container">
					<div className="row">
						<div className="col-md-offset-3 col-md-6">
							<div className='row'>
								<form className="signin"
									onSubmit={this.onSubmit}>
									<div className="form-group">
										<label htmlFor="groupname">Group Name</label>
										<input value={this.state.group} onChange={this.onChange}
											id="groupname" type="text"
											className="googleform" placeholder="andela-abuja"
											name='group' required/>
									</div>
									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input value={this.state.email} onChange={this.onChange}
											id="email" type="email"
											className="googleform" placeholder="johndoe@example.com"
											name='email' required/>
									</div>
									<div className="form-group">
										<label htmlFor="password">Password</label>
										<input value={this.state.password} onChange={this.onChange}
											id="pass" type="password"
											className="googleform" placeholder="*********"
											name='password' required/>
									</div>
									<button type="submit"
										className="googleformbtn">Create Group
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

// Export CreateGroup
export default CreateGroup;
