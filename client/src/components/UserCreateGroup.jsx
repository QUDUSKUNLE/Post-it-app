import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';
import Footer from './Footer';
import { createGroup } from '../actions/GroupActions.js';
import signOutAction from '../actions/SignOutActions.js';
import GroupStore from '../stores/GroupStore';


/**
 * @description - renders CreateGroup Component
 * @class CreateGroup
 * @extends {React.Component}
 */
export default class UserCreateGroup extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props -
   */
  constructor(props) {
    const loggedIn = (localStorage.getItem('userIn'));
    super(props);
    this.state = {
      group: '',
      loggedIn
    };

    /**
     * @description This binding is necessary to make `this` work
     * in the callback
     */
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCreateGroupEvent = this.handleCreateGroupEvent.bind(this);
    this.handleSignOutEvent = this.handleSignOutEvent.bind(this);
  }

  componentDidMount() {
    GroupStore.on('CREATE_GROUP', this.handleCreateGroupEvent);
  }

  componentWillUnmount() {
    GroupStore.removeListener('CREATE_GROUP', this.handleCreateGroupEvent);
  }

  /**
	 * onChange event.
	 * @param {object} event no parameter.
	 * @returns {void} bind input data to name.
	 */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
	 * @description This handles CreateGroup form submission
	 * @param {object} event -
	 * @returns {void}
	 */
  onSubmit(event) {
    event.preventDefault();
    const group = { group: this.state.group };
    createGroup(group);
  }

  /**
   * @description This handles createGroupEvent
   * @param {object} user .
   * @returns {void} .
  */
  handleCreateGroupEvent() {
    const createGroupResponse = GroupStore.createGroup();
    toastr.success(createGroupResponse);
  }

  /**
   * @description This handles Click event
   * @param {void} null no parameter.
   * @returns {object} response from server.
   */
  handleSignOutEvent() {
    signOutAction().then((response) => {
      toastr.success(response.data.message);
      localStorage.clear();
      this.props.history.push('/');
      location.reload();
    }).catch((error) => toastr.error(error.response.data));
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {Object} CreateGroup component
   */
  render() {
    if (!this.state.loggedIn) {
      return (
        <Redirect to="/signin" />
      );
    }
    return (
      <div>
        <nav className="navbar navbar-inverse navabar-fixed-top"
          role="navigation">
          <div className="container-fluid">
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
                <li><Link to="/broadcastboard">MessageBoard</Link></li>
                <li className="active">
                  <Link to="/group">Create Group</Link>
                </li>
                <li onClick={this.handleSignOutEvent}><Link to="/">
                  Sign Out</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6 creategroupform">
              <div className="row w3-card w3-white">
                <form id="creategroupform" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="groupname">Group Name</label>
                    <input value={this.state.group} onChange={this.onChange}
                      id="groupname" type="text"
                      className="signinform" placeholder="andela-abuja"
                      name="group" required/>
                  </div>
                  <button type="submit" className="signinformbtn">
                    Create Group
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

// props validation
UserCreateGroup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};
