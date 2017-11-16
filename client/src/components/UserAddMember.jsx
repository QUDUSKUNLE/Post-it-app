import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import { addMember, searchUser } from '../actions/memberAction';
import MemberStore from '../stores/MemberStore';
import GroupStore from '../stores/GroupStore';
import { getUserGroups } from '../actions/groupAction';

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
      group: '',
      member: '',
      keyword: '',
      searchResult: [],
    };
    /**
     * @description This binding is necessary to make `this` work
     * in the callback
     */
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleAddMemberToGroup = this.handleAddMemberToGroup.bind(this);
    this.userGroups = this.userGroups.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
   * @method componentDidMount
   * @description Adds an event Listener to the Store and fires
	 * when the component is fully mounted.
   * @return {void} void
   * @memberof UserAddMember
   */
  componentDidMount() {
    $('#selectId').val('');
    getUserGroups();
    GroupStore.on('GET_USER_GROUPS', this.userGroups);
    MemberStore.on('ADD_MEMBER', this.handleAddMemberToGroup);
    MemberStore.on('SEARCH_USER', this.handleSearch);
  }

  /**
   * @method componentWillUnmount
   * @description remove event Listener from the Store and fires.
   * @return {void} void
   * @memberof UserAddMember
   */
  componentWillUnmount() {
    GroupStore.removeListener('GET_USER_GROUPS', this.userGroups);
    MemberStore.removeListener('ADD_MEMBER', this.handleAddMemberToGroup);
    MemberStore.removeListener('SEARCH_USER', this.handleSearch);
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
    const memberDetails = {
      groupId: this.state.group,
      memberId: $('#selectId').val()
    };

    addMember(memberDetails);
  }

  /**
   * @description This handles on select of a member
   * @param {string} memberId
   * @returns {void} .
  */
  onSelect(memberId) {
    $('#selectId').val(memberId);
  }
  /**
   * @description This handles search query
   * @returns {void} .
  */
  handleKeyPress() {
    const query = { keyword: this.state.keyword };
    if ((this.state.keyword).length >= 1) {
      searchUser(query);
    }
  }
  /**
   * @memberof UserAddMember
   * @return {*} void
   */
  handleSearch() {
    this.setState({
      searchResult: MemberStore.getSearchUser()
    });
  }
  /**
   * @memberof UserAddMember
   * @return {*} void
   */
  userGroups() {
    this.setState({
      groups: GroupStore.allGroups()
    });
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
            <h5 className="text-center">
              <b>Add Member to group</b>
            </h5>
            <div className="row w3-card w3-white">
              <form className="addmemberform" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="groupname">Group Name</label>
                  <select
                    name="group" onChange={this.onChange}
                    className="form-control"
                  >
                    <option value="">Select a group</option>
                    {(this.state.groups).map(group =>
                      <option
                        key={Object.values(group)}
                        value={Object.values(group)}
                      >
                        {Object.keys(group)}</option>
                    )}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="search">Search User</label>
                  <input
                    list="searchUser"
                    id="searchUsers"
                    value={this.state.keyword}
                    onChange={this.onChange}
                    onKeyPress={this.handleKeyPress}
                    type="text"
                    className="form-control"
                    placeholder="Search ...."
                    name="keyword" required
                  />
                  <datalist id="searchUser">
                   {this.state.searchResult.map(user =>
                    (<option
                      key={user.userId} value={user.userName}
                      onClick={this.onSelect(user.userId)}
                    />)
                   )}
                  </datalist>
                  <input
                    id="selectId"
                    type="hidden"
                    name="search"
                  />
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
  }),
  memberId: PropTypes.string
};
