import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';
import Groups from './userGroups.jsx';
import ChatBox from './userChatBox.jsx';
import Footer from './Footer.jsx';
import { getUserGroup } from '../actions/groupAction.js';
import { getGeneralMessage,
  getGroupMessage } from '../actions/messageActions.js';
import { signoutAction } from '../actions/signOutActions.js';
import { getGroupMembers } from '../actions/memberActions.js';
import MemberStore from '../stores/MemberStore.js';
import GroupStore from '../stores/GroupStore.js';
import MessageStore from '../stores/MessageStore.js';

/**
 * @description - renders BroadCastBoard Component
 * @class BroadCastBoard
 * @extends {React.Component}
 */
export default class BroadCastBoard extends React.Component {
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
      groupName: '',
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
    getUserGroup();
    getGeneralMessage();
  }

  /**
   * Attach an event listener to favorite store
   * @method componentDidMount
   * @return {null} -
   */
  componentDidMount() {
    GroupStore.on('GET_GROUPS', this.userGroups);
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
    GroupStore.removeListener('GET_GROUPS', this.userGroups);
    MemberStore.removeListener('GENERAL', this.userGroups);
  }

  /**
   * @method getMembersOnClick
   * @return {null} -
   */
  getMembersOnClick(i) {
    this.setState({ groupName: i[0], defaultGroup: i[1].group },
      () => {
        const group = this.state.defaultGroup;
        getGroupMessage({ group });
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
   * @param {object} e The first number.
   * @returns {void} bind input values to name.
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * onClick event.
   * @returns {object} response from server.
  */
  onClick() {
    signoutAction();
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
    const grouplist = this.state.groups.map((group, i) =>
      <li key={i}
        value={group}
        name={group}
        onClick={() => getGroupMembers({ group })}>
        <Link to="#"> {group}
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
            <Groups
              grouplist={grouplist}
              getMembers={this.getMembersOnClick}
              />
            <ChatBox
              defaultGroup={this.state.defaultGroup}
              allGeneralMessage={this.state.allGeneralMessage}/>
          </div>
        </div>
      </div>
    );
  }
}

// props validation
BroadCastBoard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
};
