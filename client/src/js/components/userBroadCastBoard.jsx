import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Groups from './userGroups.jsx';
import ChatBox from './userChatBox.jsx';
// import GroupMembers from './userGroupMembers.jsx';
import { getGroups } from '../actions/groupAction.js';
import { getGeneralMessage,
  getGroupMessage } from '../actions/messageActions.js';
import { signoutAction } from '../actions/signOutActions.js';
import { getGroupMembers } from '../actions/memberActions.js';
import MemberStore from '../stores/MemberStore.js';
import GroupStore from '../stores/GroupStore.js';
import MessageStore from '../stores/MessageStore.js';
import '../../css/icon.css';


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
      messageGroupName: '',
      userName: JSON.parse(localStorage.getItem('userName')),
      allUsers: [],
      allGeneralMessage: [],
      groupMessages: [],
      signOutMessage: '',
      errSignOut: '',
      broadcastmessage: ''
    };
    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.userGroups = this.userGroups.bind(this);
    this.getMembersOnClick = this.getMembersOnClick.bind(this);
  }
  componentWillMount() {
    getGroups();
    // generalUsers();
    getGeneralMessage();
  }

  componentDidMount() {
    GroupStore.on('GET_GROUPS', this.userGroups);
    MemberStore.on('GENERAL', this.userGroups);
    // MessageStore.on('GET_GROUP_MESSAGE', this.getMembersOnClick);
  }

  componentWillUnmount() {
    GroupStore.removeListener('GET_GROUPS', this.userGroups);
    MemberStore.removeListener('GENERAL', this.userGroups);
    // MessageStore.removeListener('GET_GROUP_MESSAGE', this.getMembersOnClick);
  }

  getMembersOnClick(i) {
    this.setState({ groupName: i[0], defaultGroup: i[1].group },
      () => {
        const group = this.state.defaultGroup;
        getGroupMessage({ group });
        this.setState({
          allGeneralMessage: MessageStore.allGroupMessage()
        });
      });
  }

  userGroups() {
    this.setState({
      groups: GroupStore.allGroups(),
      // allUsers: MemberStore.allGeneralUsers(),
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
    * @param {void} nill no parameter.
    * @returns {object} response from server.
  */
  onClick() {
    signoutAction().then((response) => {
      this.setState({
        errSignOut: response.data.message
      });
      localStorage.clear();
      this.props.history.push('/');
    }).catch((error) => {
      if (error.response) {
        this.setState({
          errSignOut: error.response.data
        });
      }
    });
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {Object} BroadCastBoard component
   * @BroadCastBoard
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
        <Link to="#"> {group}</Link>
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
              <ul className="nav navbar-nav"></ul>
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
          <p className="pull-right">{`Hi, ${this.state.userName}.`}</p>
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills nav-justified">
                <li role="presentation" data-toggle="modal"
                  data-target="#myModal"><Link to="/group">Create Group</Link>
                </li>
                <li role="presentation"><Link to="/member">
                Add member</Link></li>
              </ul>
            </div>
          </div>
          <br/>
          <div className="row">
            <Groups
              grouplist={grouplist}
              getMembers={this.getMembersOnClick}/>
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
