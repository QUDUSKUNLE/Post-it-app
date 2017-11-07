import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Redirect } from 'react-router-dom';
import { addMember, getAllUsers } from '../actions/memberActions';
import MemberStore from '../stores/MemberStore';
import GroupStore from '../stores/GroupStore';
import { getUserGroups } from '../actions/GroupActions';

/**
 * @export
 * @description - renders AddMember Component
 * @class UserAddMember
 * @extends {React.Component}
 */
export default class UserAddMember extends React.Component {

  /**
   * Creates an instance of UserAddMember.
   * @constructor
   * @param {*} props -
   * @memberof UserAddMember
   */
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: JSON.parse(localStorage.getItem('userIn')),
      userId: JSON.parse(localStorage.getItem('Id')),
      groups: [],
      registeredUsers: [],
      group: {},
      member: ''
    };
    /**
     * @description This binding is necessary to make `this` work
     * in the callback
     */
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAddMemberToGroup = this.handleAddMemberToGroup.bind(this);
    this.userGroups = this.userGroups.bind(this);
  }

  /**
   * @memberof UserAddMember
   * @return {*} void
   */
  componentWillMount() {
    getUserGroups(this.state.userId);
    getAllUsers();
  }

  /**
   * @memberof UserAddMember
   * @return {*} void
   */
  componentDidMount() {
    GroupStore.on('GET_USER_GROUPS', this.userGroups);
    MemberStore.on('ALL_USERS', this.userGroups);
    MemberStore.on('ADD_MEMBER', this.handleAddMemberToGroup);
  }

  componentWillUnmount() {
    GroupStore.removeListener('GET_USER_GROUPS', this.userGroups);
    MemberStore.removeListener('ALL_USERS', this.userGroups);
    MemberStore.removeListener('ADD_MEMBER', this.handleAddMemberToGroup);
  }

  /**
   * @memberof UserAddMember
   * @return {*} void
   */
  userGroups() {
    const allUsers = MemberStore.registeredUsers();
    this.setState({
      groups: GroupStore.allGroups(),
      registeredUsers: allUsers.filter(user =>
        (Object.keys(user)[0] !== this.state.userId))
    });
  }
  /**
   * @description - onChange event
   * @param {event} event - event
   * @returns {null} null
   * @memberOf ChatBox
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
	 * @description This handles addMember form submission
	 * @param {object} event .
	 * @returns {void} .
	 */
  onSubmit(event) {
    event.preventDefault();
    const groupDetails = this.state.group.split(',');
    const memberDetails = {
      groupId: groupDetails[0],
      group: groupDetails[1],
      memberId: this.state.member
    };
    addMember(memberDetails);
  }

  /**
	 * @description This handles addMember update from store
	 * @param {object} event .
	 * @returns {void} .
	 */
  handleAddMemberToGroup() {
    const addMemberResponse = MemberStore.addMember();
    toastr.success(addMemberResponse);
    this.props.history.push('/broadcastboard');
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
                    {(this.state.groups).map(group =>
                      <option key={Object.values(group)}
                        value={[Object.values(group), Object.keys(group)]}>
                        {Object.keys(group)}</option>
                    )}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="members">Member</label>
                  <select name="member" onChange={this.onChange}
                    className="form-control">
                    <option value="">add member to group</option>
                    {(this.state.registeredUsers).map(user =>
                      <option key={Object.keys(user)}
                        value={Object.keys(user)}>
                        {Object.values(user)}</option>
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
  );
  }
}

// props validation
UserAddMember.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
};
