import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserGroups from './UserGroups';
import UserChatBox from './UserChatBox';
import NoGroupSelected from './NoGroupSelected';
import { getUserGroups } from '../actions/groupAction';
import { getGroupMessage } from '../actions/messageAction';
import { getGroupMember } from '../actions/memberAction';
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
   * @param {any} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      defaultGroup: '',
      groups: [],
      groupId: '',
      groupMessage: [],
      groupMember: [],
      groupSelected: false
    };

    this.handleSendGroupMessage = this.handleSendGroupMessage.bind(this);
    this.handleGetGroupMessage = this.handleGetGroupMessage.bind(this);
    this.handleGetUserGroups = this.handleGetUserGroups.bind(this);
    this.handleGetGroupMember = this.handleGetGroupMember.bind(this);
  }

  /**
   * Life Cycle method to be called when a component mounts
   * @method componentDidMount
   * @return {void} void
   */
  componentDidMount() {
    getUserGroups();
    GroupStore.on('GET_USER_GROUPS', this.handleGetUserGroups);
    MemberStore.on('GET_MEMBERS_OF_GROUP', this.handleGetGroupMember);
    MessageStore.on('SEND_GROUP_MESSAGE', this.handleSendGroupMessage);
    MessageStore.on('GET_GROUP_MESSAGE', this.handleGetGroupMessage);
  }
  /**
   * Life Cycle method to be called when a component Unmounts
   * @method componentWillUmount
   * @return {void}
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
   * @method handlesSendGroupMessage
   * @return {void}
   */
  handleSendGroupMessage() {
    this.setState({ groupMessage: MessageStore.allGroupMessage() });
  }

  /**
   * @method handleGetGroupMember
   * @return {void}
   */
  handleGetGroupMember() {
    this.setState({ groupMember: (MemberStore.allGroupMembers())[0] });
  }

  /**
   * @method handleGetGroupMessage
   * @return {void}
   */
  handleGetGroupMessage() {
    this.setState({ groupMessage: MessageStore.allGroupMessage() });
  }

  /**
   * @method handleGetUserGroups
   * @return {void}
   */
  handleGetUserGroups() {
    this.setState({ groups: GroupStore.allGroups() });
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {void}
   */
  render() {
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
        }}
      ><Link to="#">{Object.keys(group)}</Link>
      </li>);
    return (
      <div className="row-offcanvas row-offcanvas-left">
        <UserGroups
          grouplist={groupList}
          member={this.state.groupMember}
          groupSelected={this.state.groupSelected}
        />
        {this.state.groupSelected
          ? (<UserChatBox
            defaultGroup={this.state.defaultGroup}
            groupId={this.state.groupId}
            allGeneralMessage={this.state.groupMessage}
          />)
          : <NoGroupSelected />}
      </div>
    );
  }
}

// props validation
UserBroadCastBoard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};
