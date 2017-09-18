import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';
import Groups from './userGroups.jsx';
import ChatBox from './userChatBox.jsx';
import { getGroups } from '../actions/groupAction.js';
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
    this.onClick = this.onClick.bind(this);
    this.newGeneralMessage = this.newGeneralMessage.bind(this);
    this.newGroupMessage = this.newGroupMessage.bind(this);
    this.getGroupMessage = this.getGroupMessage.bind(this);
    this.userGroups = this.userGroups.bind(this);
    this.getMembersOnClick = this.getMembersOnClick.bind(this);
  }
  componentWillMount() {
    getGroups();
    getGeneralMessage();
  }

  componentDidMount() {
    GroupStore.on('GET_GROUPS', this.userGroups);
    MemberStore.on('GENERAL', this.userGroups);
    MessageStore.on('SEND_GENERAL_MESSAGE', this.newGeneralMessage);
    MessageStore.on('SEND_GROUP_MESSAGE', this.newGroupMessage);
    MessageStore.on('GET_GROUP_MESSAGE', this.getGroupMessage);
  }

  componentWillUnmount() {
    GroupStore.removeListener('GET_GROUPS', this.userGroups);
    MemberStore.removeListener('GENERAL', this.userGroups);
  }

  getMembersOnClick(i) {
    this.setState({ groupName: i[0], defaultGroup: i[1].group },
      () => {
        const group = this.state.defaultGroup;
        getGroupMessage({ group });
      });
  }
  newGeneralMessage() {
    this.setState({
      allGeneralMessage: MessageStore.allGeneralMessage()
    });
  }
  newGroupMessage() {
    this.setState({
      allGeneralMessage: MessageStore.allGroupMessage()
    });
  }
  getGroupMessage() {
    this.setState({
      allGeneralMessage: MessageStore.allGroupMessage()
    });
  }

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
    * @param {void} null no parameter.
    * @returns {object} response from server.
  */
  onClick() {
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
            <Link className="navbar-brand" to="#">
              PostIt<small>App</small>
            </Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="#">Home</Link></li><li className="active">
                <Link to="/broadcastboard">ChatRoom</Link></li>
              <li onClick={this.onClick}><Link to="#">Sign out</Link></li>
            </ul>
          </div>
        </div>
      </nav>
        <div className="container">
          <span>{this.state.errSignOut}</span>
          <div className="row">
            <div className="col-md-12">
              <p className="pull-right">{`Hi, ${this.state.userName}.`}</p>
            </div>
          </div>
          <div className="row">
            <ul className="nav nav-pills nav-justified">
              <li className="col-md-6"><Link to="/group">Create Group</Link>
              </li>
              <li className="col-md-6"><Link to="/member">Add member</Link></li>
            </ul>
          </div>
          <br/>
          <div className="row">
            <Groups
              grouplist={grouplist}
              getMembers={this.getMembersOnClick}
              generalMessageLength={this.state.allGeneralMessage.length}/>
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
