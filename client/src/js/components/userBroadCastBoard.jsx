import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Groups from './userGroups.jsx';
import ChatBox from './userChatBox.jsx';
import GroupMembers from './userGroupMembers.jsx';
import { getGroups } from '../actions/groupAction.js';
import { sendMessage } from '../actions/appActions.js';
import { signoutAction } from '../actions/signOutActions.js';
import { generalUsers } from '../actions/memberActions.js';
import MemberStore from '../stores/MemberStore.js';
import GroupStore from '../stores/GroupStore.js';
import '../../css/icon.css';


/**
  * Represents BroadCastBoard Component.
*/
export default class BroadCastBoard extends React.Component {
  /**
    * @param {string} props inbuilt props.
  */
  constructor(props) {
    super(props);
    const userName = JSON.parse(localStorage.getItem('userName'));
    // console.log(GroupStore.allGroups());
    // console.log(getGroups());
    this.state = {
      groups: [],
      group: '',
      userName,
      allUsers: [],
      message: '',
      signOutMessage: '',
      errSignOut: '',
      broadcastmessage: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.userGroups = this.userGroups.bind(this);
    //
    // this.getMembersOnClick = this.getMembersOnClick.bind(this);
  }
  componentWillMount() {
    getGroups();
    generalUsers();
    // call action that gets the group that a user belongs to
    // call action that gets the chat belonginf to that group
    // call action that get all the user that belongs to that group
  }

  componentDidMount() {
    GroupStore.on('GET_GROUPS', this.userGroups);
    MemberStore.on('GENERAL', this.userGroups);
    // MemberStore.on('GET_MEMBERS_OF_A_GROUP', this.getMembersOnClick);
    // add event listener for the 3 actions
    // add event listener for the 3 actions
  }

  componentWillUnmount() {
    GroupStore.removeListener('GET_GROUPS', this.userGroups);
    MemberStore.removeListener('GENERAL', this.userGroups);
    // MemberStore.removeListener('GET_MEMBERS_OF_A_GROUP',
    // this.getMembersOnClick);
  }

  // getMembersOnClick() {
  //   this.setState({
  //     group: MemberStore.allGroupMembers()
  //   }, () => {
  //     console.log(this.state.group);
  //   });
  // }

  userGroups() {
    console.log('got here??', GroupStore.allGroups());
    console.log('got here too', MemberStore.allGeneralUsers());
    this.setState({
      groups: GroupStore.allGroups(),
      allUsers: MemberStore.allGeneralUsers()
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
    * onSubmit event.
    * @param {object} e .
    * @returns {void} .
  */
  onSubmit(e) {
    e.preventDefault();
    const broadcastmessage = {
      message: this.state.message
    };
    sendMessage(broadcastmessage).then((res) => {
      this.setState({
        message: res.data.message
      });
    });
  }
  /**
    * onClick event.
    * @param {void} nill no parameter.
    * @returns {object} response from server.
  */
  onClick() {
    signoutAction().then((resp) => {
      this.setState({
        signupMessage: resp.data.message
      });
      this.props.history.push('/');
      localStorage.removeItem('userName');
    }).catch((error) => {
      if (error.response) {
        this.setState({
          errSignOut: error.response.data
        });
      }
    });
  }
  /**
    * @override
  */
  render() {
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
          <p className="pull-right">{`Hi, ${this.state.username}.`}</p>
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
              grouplist={this.state.groups}/>
            <ChatBox/>
            <GroupMembers Users={this.state.allUsers}/>
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
