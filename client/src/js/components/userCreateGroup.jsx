import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { createGroup, signoutAction } from '../actions/appActions.js';

const loggedIn = (localStorage.getItem('user')) !== false;
/**
 * Represents CreateGroup Component.
 */
export default class CreateGroup extends React.Component {
  /**
     * @param {string} props inbuilt props.
     */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      group: '',
      responseMessage: '',
      signOutMessage: ''
    };
    // Bind Create Group Input Fields
    this.onChange = this.onChange.bind(this);
    // Bind to Create Group Form
    this.onSubmit = this.onSubmit.bind(this);

    this.onClick = this.onClick.bind(this);
  }

  /**
	* onChange event.
	* @param {object} e no parameter.
	* @returns {void} bind input data to name.
	*/
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
	* onSubmit event.
	* @param {object} e .
	* @returns {void} .
	*/
  onSubmit(e) {
    e.preventDefault();
    const group = {
      email: JSON.parse(localStorage.getItem('user')).email,
      password: JSON.parse(localStorage.getItem('user')).password,
      group: this.state.group
    };
    // createGroup Action
    createGroup(group)
      .then(({ data }) => {
        if (data.message) {
          this.setState({
            responseMessage: data.message
          });
        }
      })
      .catch((error) => {
        if (error) {
          this.setState({
            responseMessage: error.response.data.message
          });
        }
        // console.log(error.Error);
      });
  }

  /**
 * onClick event.
 * @param {void} nil no parameter.
 * @returns {object} response from server.
 */
  onClick() {
    // user`s signout Action
    signoutAction()
      .then((resp) => {
        if (resp) {
          // remove user`s details completely from localStorage
          localStorage.removeItem('user');
          this.setState({
            signOutMessage: resp.data.message
          });
        }
        this.props.history.push('/');
      }).catch((error) => {
        if (error.response) {
          this.setState({
            signOutMessage: error.response.data.message
          });
        }
      });
  }

  /**
		* @override
	*/
  render() {
    if (!loggedIn) {
      return (
        <Redirect to="/signin" />
      );
    }
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
              <Link className="navbar-brand" to="#">PostIt<small>App</small>
              </Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/broadcastboard">ChatRoom</Link></li>
                <li className="active">
                  <Link to="/group">Create Group</Link>
                </li>
                <li onClick={this.onClick}><Link to="/">Sign Out</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6 creategroupform">
              <div>
                <center>
                  <span>{this.state.signOutMessage}</span>
                </center>
              </div>
              <div className="row w3-card w3-white">
                <div>
                  <center>
                    <span>{this.state.responseMessage}</span>
                  </center>
                </div>
                <form id="creategroupform" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="groupname">Group Name</label>
                    <input value={this.state.group} onChange={this.onChange}
                      id="groupname" type="text"
                      className="signinform" placeholder="andela-abuja"
                      name="group" required/>
                  </div>
                  <button type="submit" className="signinformbtn">Create Group
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

CreateGroup.propTypes = {
  history: PropTypes.function
};
