import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';
import Footer from './Footer.jsx';
import { addMember } from '../actions/appActions.js';
import { signoutAction } from '../actions/signOutActions.js';
import MemberStore from '../stores/MemberStore.js';
import GroupStore from '../stores/GroupStore.js';
import { getGroups } from '../actions/groupAction.js';
import { generalUsers } from '../actions/memberActions.js';

/**
 * @description - renders AddMember Component
 * @class AddMember
 * @extends {React.Component}
 */
export default class AddMember extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props -
   */
  constructor(props) {
    const loggedIn = (localStorage.getItem('userIn'));
    super(props);
    this.state = {
      loggedIn,
      groups: [],
      general: [],
      group: '',
      member: '',
      addMemberResponse: ''
    };
    // bind the input values
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSignOutEvent = this.handleSignOutEvent.bind(this);
    this.userGroups = this.userGroups.bind(this);
  }

  componentWillMount() {
    getGroups();
    generalUsers();
  }

  componentDidMount() {
    GroupStore.on('GET_GROUPS', this.userGroups);
    MemberStore.on('GENERAL', this.userGroups);
  }
  componentWillUnmount() {
    GroupStore.removeListener('GET_GROUPS', this.userGroups);
    MemberStore.removeListener('GENERAL', this.userGroups);
  }

  userGroups() {
    this.setState({
      groups: GroupStore.allGroups(),
      general: MemberStore.allGeneralUsers()
    });
  }
  /**
   * @description - onChange event
   * @param {e} e - event
   * @returns {null} null
   * @memberOf ChatBox
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
	 * @description This handles addMember form submission
	 * @param {object} e .
	 * @returns {void} .
	 */
  onSubmit(e) {
    e.preventDefault();
    const memberDetails = {
      group: this.state.group,
      member: this.state.member
    };

    /**
     * @description This handles Creategroup Action
     * @param {object} memberDetails .
     * @returns {void} .
     */
    addMember(memberDetails)
      .then(({ data }) => {
        if (data) {
          this.setState({
            addMemberResponse: data.message
          });
        }
        toastr.success(this.state.addMemberResponse);
        this.props.history.push('/broadcastboard');
      })
      .catch((err) => {
        if (err) {
          this.setState({
            addMemberResponse: err.response.data.message
          });
        }
        toastr.error(this.state.addMemberResponse);
      });
  }

  /**
   * @description handleSignOutEvent.
   * @param {void} null no parameter.
   * @returns {object} response from server.
   */
  handleSignOutEvent() {
    signoutAction().then((response) => {
      this.setState({
        errSignOut: response.data.message
      });
      toastr.success(this.state.errSignOut);
      localStorage.clear();
      this.props.history.push('/');
    }).catch((error) => {
      if (error.response) {
        this.setState({
          errSignOut: error.response.data
        });
      }
      toastr.error(this.state.errSignOut);
    });
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {Object} AddMember component
   * @AddMember
   */
  render() {
    if (!this.state.loggedIn) {
      return (
        <Redirect to="/signin" />
      );
    }
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
              <Link className="navbar-brand" to="#">
                PostIt<small>App</small>
              </Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav"></ul>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/broadcastboard">MessageBoard</Link></li>
                <li className="active"><Link to="/member">Add Member</Link></li>
                <li onClick={this.handleSignOutEvent}>
                  <Link to="/">Sign Out</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container addmember">
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <div className="row w3-card w3-white">
                <form className="addmemberform" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="groupname">Group Name</label>
                    <select name="group" onChange={this.onChange}
                      className="form-control">
                      <option value="">Select a group</option>
                      {(this.state.groups).map((group, i) =>
                        <option key={i}
                          value={group}>
                          {group}</option>
                      )}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="members">Member</label>
                    <select name="member" onChange={this.onChange}
                      className="form-control">
                      <option value="">add member to group</option>
                      {(this.state.general).map((member, i) =>
                        <option key={i}
                          value={member}>
                          {member}</option>
                      )}
                    </select>
                  </div>
                  <button type="submit" className="signinformbtn">Add Member
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
AddMember.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
};
