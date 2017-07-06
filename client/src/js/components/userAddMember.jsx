import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/icon.css';

/**
 * Represents AddMember Component.
 */
class AddMember extends React.Component {
  // AddMember constructor
  /**
     * @param {string} props inbuilt props.
     */
  constructor(props) {
    super(props);
    this.state = {
      group: '',
      member: '',
      email: '',
      password: ''
    };
    // bind the input values
    this.onChange = this.onChange.bind(this);

    // onSubmit events
    this.onSubmit = this.onSubmit.bind(this);

    // Sign out
    this.onClick = this.onClick.bind(this);
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
 * onChange event.
 * @param {object} addmember The first number.
 * @returns {void} bind input values to name.
 */
  onChange(addmember) {
    this.setState({
      [addmember.target.name]: addmember.target.value
    });
  }

  /**
 * onSubmit event.
 * @param {object} addmember .
 * @returns {void} .
 */
  onSubmit(addmember) {
    addmember.preventDefault();
    const memberDetails = {
      email: this.state.email,
      password: this.state.password,
      group: this.state.group,
      member: this.state.member
    };
    axios.post('/group/member', memberDetails)
      .then((response) => {
        // console.log(response.data);
        alert(response.data.message);
        this.props.history.push('/broadcastboard');
      })
      .catch((error) => {
        if (error.response) {
          // console.log(error.response.data);
        }
      });
  }

  /**
     * @override
     */
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top"
          role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle"
                data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
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
                <li className="active"><Link to="">AddMember</Link></li>
                <li><Link to="/broadcastboard">Chat Room</Link></li>
								<li onClick={this.onClick}><Link to="">Sign Out</Link></li>
							</ul>
						</div>
					</div>
        </nav>
        <div className="container addmember">
					<div className="row">
						<div className="col-md-offset-3 col-md-6">
							<div className='row'>
								<form className="col-md-offset-3 col-md-6"
									onSubmit={this.onSubmit}>
									<div className="form-group">
										<label htmlFor="groupname">Group Name</label>
										<input value={this.state.group} onChange={this.onChange}
											id="groupname" type="text"
											className="form-control" placeholder="andela-abuja"
											name='group' required/>
									</div>
                  <div className="form-group">
										<label htmlFor="email">Member</label>
										<input value={this.state.member} onChange={this.onChange}
											id="member" type="text"
											className="form-control" placeholder="adewale"
											name='member' required/>
									</div>
									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input value={this.state.email} onChange={this.onChange}
											id="email" type="email"
											className="form-control" placeholder="johndoe@example.com"
											name='email' required/>
									</div>
									<div className="form-group">
										<label htmlFor="password">Password</label>
										<input value={this.state.password} onChange={this.onChange}
											id="pass" type="password"
											className="form-control" placeholder="*********"
											name='password' required/>
									</div>
									<button type="submit"
										className="btn btn-success form-control">Add Member
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
// Export AddMember
export default AddMember;