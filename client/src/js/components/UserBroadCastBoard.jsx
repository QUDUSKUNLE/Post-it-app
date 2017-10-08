import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';
import UserGroups from './userGroups';
import UserChatBox from './userChatBox';
// import Footer from './Footer.jsx';
import { getGroup } from '../actions/groupAction.js';
import { getGeneralMessage,
  getGroupMessage } from '../actions/messageActions.js';
import { signoutAction } from '../actions/signOutActions.js';
import { getGroupMember } from '../actions/memberActions.js';
import MemberStore from '../stores/MemberStore';
import GroupStore from '../stores/GroupStore';
import MessageStore from '../stores/MessageStore';

/**
 * @description - renders BroadCastBoard Component
 * @class BroadCastBoard
 * @extends {React.Component}
 */
export default class UserBroadCastBoard extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: JSON.parse(localStorage.getItem('userIn')),
      userId: JSON.parse(localStorage.getItem('Id')),
      defaultGroup: 'general',
      groups: [],
      groupId: '',
      userName: JSON.parse(localStorage.getItem('userName')),
      allGeneralMessage: [],
      groupMessages: [],
      signOutMessage: '',
      errSignOut: '',
      broadcastmessage: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleSignOutAction = this.handleSignOutAction.bind(this);
    this.newGeneralMessage = this.newGeneralMessage.bind(this);
    this.newGroupMessage = this.newGroupMessage.bind(this);
    this.getGroupMessage = this.getGroupMessage.bind(this);
    this.userGroups = this.userGroups.bind(this);
    this.getMembersOnClick = this.getMembersOnClick.bind(this);
  }
  /**
   * Call action on initial page load
   * @method componentWillMount
   * @return {null} -
   */
  componentWillMount() {
    const id = this.state.userId;
    getGroup(id);
    getGeneralMessage();
  }

  /**
   * Attach an event listener to favorite store
   * @method componentDidMount
   * @return {null} -
   */
  componentDidMount() {
    GroupStore.on('GET_USER_GROUPS', this.userGroups);
    MemberStore.on('GENERAL', this.userGroups);
    MessageStore.on('SEND_GENERAL_MESSAGE', this.newGeneralMessage);
    MessageStore.on('SEND_GROUP_MESSAGE', this.newGroupMessage);
    MessageStore.on('GET_GROUP_MESSAGE', this.getGroupMessage);
  }

  /**
   * @method componentWillUnount
   * @return {null} -
   */
  componentWillUnmount() {
    GroupStore.removeListener('GET_USER_GROUPS', this.userGroups);
    MemberStore.removeListener('GENERAL', this.userGroups);
    MessageStore.removeListener('SEND_GENERAL_MESSAGE', this.newGeneralMessage);
    MessageStore.removeListener('SEND_GROUP_MESSAGE', this.newGroupMessage);
    MessageStore.removeListener('GET_GROUP_MESSAGE', this.getGroupMessage);
  }

  /**
   * @method getMembersOnClick
   * @return {null} -
   */
  getMembersOnClick(index) {
    this.setState({ defaultGroup: index[1], groupId: index[2] },
      () => {
        const groupId = this.state.groupId;
        getGroupMessage(groupId);
      });
  }

  /**
   * @method newGeneralMessage
   * @return {null} -
   */
  newGeneralMessage() {
    const newMessage = MessageStore.allGeneralMessage();
    this.setState({
      allGeneralMessage: newMessage
    });
  }

  /**
   * @method newGroupMessage
   * @return {null} -
   */
  newGroupMessage() {
    this.setState({
      allGeneralMessage: MessageStore.allGroupMessage()
    });
  }

  /**
   * @method getGroupMessage
   * @return {null} -
   */
  getGroupMessage() {
    this.setState({
      allGeneralMessage: MessageStore.allGroupMessage()
    });
  }

  /**
   * @method userGroups
   * @return {null} -
   */
  userGroups() {
    this.setState({
      groups: GroupStore.allGroups(),
      defaultGroup: 'general',
      allGeneralMessage: MessageStore.allGeneralMessage()
    });
  }
  /**
   * onChange event.
   * @param {object} event The first number.
   * @returns {void} bind input values to name.
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSignOutAction() {
    signoutAction().then((response) => {
      toastr.success(response.data.message);
      localStorage.clear();
      this.props.history.push('/');
    }).catch((error) => {
      if (error.response) {
        toastr.error(error.response.data);
      }
    });
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {Object} BroadCastBoard component
   */
  render() {
    if (!this.state.loggedIn) {
      return (
        <Redirect to="/signin" />
      );
    }
    const grouplist = this.state.groups.map((group) =>
      <li key={Object.values(group)}
        value={Object.keys(group)}
        name={Object.keys(group)}
        onClick={() => getGroupMember(Object.values(group))}>
        <Link to="#"> {Object.keys(group)}
        </Link>
      </li>, this);
    return (
      <div>
        <nav className="navbar navbar-inverse navabar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle"
                data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="#">
                PostIt<small>App</small>
              </Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li className="active">
                  <Link to="/broadcastboard">MessageBoard</Link>
                </li>
                <li>
                  <Link to="/group">Create Group</Link>
                </li>
                <li onClick={this.handleSignOutAction}>
                  <Link to="#">Sign out</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <p className="pull-left">{`Hi, ${this.state.userName}.`}</p>
            </div>
          </div>
          <div className="row">
            <ul className="nav nav-pills nav-justified">
              <li className="col-md-6"><Link to="/member">Add member</Link></li>
            </ul>
          </div>
          <br/>
          <div className="row">
            <UserGroups
              grouplist={grouplist}
              getMembers={this.getMembersOnClick}
              />
            <UserChatBox
              defaultGroup={this.state.defaultGroup}
              groupId={this.state.groupId}
              allGeneralMessage={this.state.allGeneralMessage}/>
          </div>
        </div>
      </div>
    );
  }
}

// props validation
UserBroadCastBoard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
};
