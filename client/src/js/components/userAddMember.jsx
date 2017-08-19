import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addMember } from '../actions/appActions.js';
import { signoutAction } from '../actions/signOutActions.js';
import GroupMemberStore from '../stores/GroupMemberStore.js';
import GroupStore from '../stores/GroupStore.js';
import { getGroups } from '../actions/groupAction.js';
import { generalMembers } from '../actions/memberActions.js';
import '../../css/icon.css';


/**
  * Represents AddMember Component.
*/
export default class AddMember extends React.Component {
  /**
    * @param {string} props inbuilt props.
  */
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem('user'));
    const groups = GroupStore.allGroups(user);
    const general = GroupMemberStore.allGeneralMembers(user);
    this.state = {
      user,
      groups,
      general,
      group: '',
      member: '',
      addmemberMess: ''
    };
    // bind the input values
    this.onChange = this.onChange.bind(this);
    // onSubmit events
    this.onSubmit = this.onSubmit.bind(this);
    // Sign out
    this.onClick = this.onClick.bind(this);
    this.userGroups = this.userGroups.bind(this);
  }

  componentWillMount() {
    getGroups(this.state.user);
    generalMembers(this.state.user);
  }

  componentDidMount() {
    GroupStore.on('GET_GROUPS', this.userGroups);
    GroupMemberStore.on('GENERAL', this.userGroups);
  }
  componentWillUnmount() {
    GroupStore.removeListener('GET_GROUPS', this.userGroups);
    GroupMemberStore.removeListener('GENERAL', this.userGroups);
  }

  userGroups() {
    const userGroups = GroupStore.allGroups(this.state.user);
    const genMembers = GroupMemberStore.allGeneralMembers(this.state.user);
    this.setState({
      groups: userGroups,
      general: genMembers
    });
  }
  /**
    * onChange event.
    * @param {object} ee The first number.
    * @returns {void} bind input values to name.
  */
  onChange(ee) {
    this.setState({ [ee.target.name]: ee.target.value });
  }

  /**
    * onSubmit event.
    * @param {object} e .
    * @returns {void} .
  */
  onSubmit(e) {
    e.preventDefault();
    const memberDetails = {
      email: JSON.parse(localStorage.getItem('user')).email,
      password: JSON.parse(localStorage.getItem('user')).password,
      group: this.state.group,
      member: this.state.member
    };
    addMember(memberDetails)
      .then(({ data }) => {
        if (data) {
          this.setState({
            addmemberMess: data.message
          });
        }
        this.props.history.push('/broadcastboard');
      })
      .catch((err) => {
        if (err) {
          this.setState({
            addmemberMess: err.response.data.message
          });
        }
      });
  }

  /**
    * onClick event.
    * @param {void} nil no parameter.
    * @returns {object} response from server.
 */
  onClick() {
    signoutAction()
      .then(() => {
        localStorage.removeItem('user');
        this.props.history.push('/');
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
              <ul className="nav navbar-nav"></ul>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/broadcastboard">Chat Room</Link></li>
                <li className="active"><Link to="/member">AddMember</Link></li>
                <li onClick={this.onClick}><Link to="/">Sign Out</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container addmember">
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <div className="row w3-card w3-white">
                <div>
                  <center>
                    <span>{this.state.addmemberMess}</span>
                  </center>
                </div>
                <form className="addmemberform" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="groupname">Group Name</label>
                    <select name="group" onChange={this.onChange}
                      className="form-control">
                      <option value="">Select a group</option>
                      {(Object.keys(this.state.groups)).map((group, i) =>
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
