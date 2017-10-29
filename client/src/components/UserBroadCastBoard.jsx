import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import $ from 'jquery';
import { Link, Redirect } from 'react-router-dom';
import UserGroups from './UserGroups';
import UserChatBox from './UserChatBox';
import Footer from './Footer';
import NoGroupSelected from './NoGroupSelected';
import { getUserGroups } from '../actions/groupAction';
import { getGroupMessage } from '../actions/messageActions';
import { signoutAction } from '../actions/signOutActions';
import { getGroupMember } from '../actions/memberActions';
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
      defaultGroup: '',
      groups: [],
      groupId: '',
      userName: JSON.parse(localStorage.getItem('userName')),
      groupMessage: [],
      groupMember: [],
      groupSelected: false
    };

    /**
     * @description This binding is necessary to make `this` work
     * in the callback
     */
    this.handleOnChangeEvent = this.handleOnChangeEvent.bind(this);
    this.handleSignOutAction = this.handleSignOutAction.bind(this);
    this.handleSendGroupMessage = this.handleSendGroupMessage.bind(this);
    this.handleGetGroupMessage = this.handleGetGroupMessage.bind(this);
    this.handleGetUserGroups = this.handleGetUserGroups.bind(this);
    this.handleGetGroupMember = this.handleGetGroupMember.bind(this);
  }

  /**
   * Call action on initial page load
   * @method componentWillMount
   * @return {*} void
   */
  componentWillMount() {
    getUserGroups(this.state.userId);
  }

  /**
   * Attach an event listener to favorite store
   * @method componentDidMount
   * @return {*} -
   */
  componentDidMount() {
    GroupStore.on('GET_USER_GROUPS', this.handleGetUserGroups);
    MemberStore.on('GET_MEMBERS_OF_GROUP', this.handleGetGroupMember);
    MessageStore.on('SEND_GROUP_MESSAGE', this.handleSendGroupMessage);
    MessageStore.on('GET_GROUP_MESSAGE', this.handleGetGroupMessage);
  }

  /**
   * @method componentWillUnount
   * @return {*} void
   */
  componentWillUnmount() {
    GroupStore.removeListener('GET_USER_GROUPS',
      this.handleGetUserGroups);
    MemberStore.removeListener('GET_MEMBERS_OF_GROUP',
      this.handleGetGroupMember);
    MessageStore.removeListener('SEND_GROUP_MESSAGE',
      this.handleSendGroupMessage);
    MessageStore.removeListener('GET_GROUP_MESSAGE',
      this.handleGetGroupMessage);
  }

  /**
   * @method newGroupMessage
   * @return {*} void
   */
  handleSendGroupMessage() {
    this.setState({
      groupMessage: MessageStore.allGroupMessage()
    });
  }

  handleGetGroupMember() {
    this.setState({ groupMember: (MemberStore.allGroupMembers())[0] });
  }

  /**
   * @method getGroupMessage
   * @return {*} void
   */
  handleGetGroupMessage() {
    this.setState({ groupMessage: MessageStore.allGroupMessage() });
  }

  /**
   * @method userGroups
   * @return {*} void
   */
  handleGetUserGroups() {
    this.setState({ groups: GroupStore.allGroups() });
  }
  /**
   * onChange event.
   * @param {object} event The first number.
   * @returns {*} bind input values to name.
   */
  handleOnChangeEvent(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignOutAction() {
    signoutAction().then((response) => {
      toastr.success(response.data.message);
      this.props.history.push('/');
      localStorage.clear();
      location.reload();
    }).catch((error) => toastr.error(error.response.data));
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {*} BroadCastBoard component
   */
  render() {
    if (!this.state.loggedIn) {
      return (
        <Redirect to="/signin" />
      );
    }
    const groupList = this.state.groups.map((group) =>
      <li
        className="text-center"
        key={Object.values(group)}
        value={Object.keys(group)}
        name={Object.keys(group)}
        onClick={() => {
          getGroupMember(Object.values(group));
          getGroupMessage(Object.values(group));
          this.setState({
            defaultGroup: (Object.keys(group))[0],
            groupId: (Object.values(group))[0],
            groupSelected: true
          });
        }}><Link to="#"> {Object.keys(group)}</Link>
      </li>);
    const isGroupSelected = () => {
      let selectedGroup;
      if (this.state.groupSelected) {
        selectedGroup =
          (<UserChatBox
            defaultGroup={this.state.defaultGroup}
            groupId={this.state.groupId}
            allGeneralMessage={this.state.groupMessage} />);
      } else {
        selectedGroup = <NoGroupSelected />;
      }
      return selectedGroup;
    };
    $(document).ready(() => {
      $('[data-toggle=offcanvas]').click(() => {
        $('.row-offcanvas').toggleClass('active');
      });
    });
    return (
      <div>
        <div className="navbar navbar-inverse navabar-fixed-top">
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
        </div>
        {/* <div className="row">
          <div className="col-md-12">
            <p className="pull-left">{`Hi, ${this.state.userName}.`}</p>
          </div>
        </div> */}
        <div className="row-offcanvas row-offcanvas-left">
          <UserGroups
            grouplist={groupList}
            member={this.state.groupMember}/>
          {isGroupSelected()}
        </div>
        <Footer/>
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
