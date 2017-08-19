import React from 'react';
import { Link } from 'react-router-dom';
import ChatBox from './userChatBox.jsx';
import GroupMembers from './userGroupMembers.jsx';
import { getGroups } from '../actions/groupAction.js';
import GroupStore from '../stores/GroupStore.js';
import { generalMembers } from '../actions/memberActions.js';
import GroupMemberStore from '../stores/GroupMemberStore.js';


export default class Groups extends React.Component {
  /**
    * @param {string} props inbuilt props.
  */
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem('user'));
    const groups = GroupStore.allGroups(user);
    const general = GroupMemberStore.allGeneralMembers(user);
    this.state = {
      groups,
      general,
      user,
      displayNewGroupName: [],
      groupname: 'general',
      newMembers: '',
      message: '',
      newGroup: ''
    };
    this.userGroups = this.userGroups.bind(this);
    // this.onClick = this.onClick.bind(this);
    // this.onChange = this.onChange.bind(this);
    this.getMembersOnClick = this.getMembersOnClick.bind(this);
  }

  componentWillMount() {
    getGroups(this.state.user);
    generalMembers(this.state.user);
    // getGroupMembers(this.state.newGroup);
    // call action that gets the group that a user belongs to
    // call action that gets the chat belonginf to that group
    // call action that get all the user that belongs to that group
  }

  componentDidMount() {
    GroupStore.on('GET_GROUPS', this.userGroups);
    GroupMemberStore.on('GENERAL', this.userGroups);
    // GroupMemberStore.on('GET_MEMBERS', this.getMembersOnClick);
    // add event listener for the 3 actions
  }

  componentWillUnmount() {
    GroupStore.removeListener('GET_GROUPS', this.userGroups);
    GroupMemberStore.removeListener('GENERAL', this.userGroups);
    // GroupMemberStore.removeListener('GET_MEMBERS', this.getMembersOnClick);
    // onClick should unMount GroupMemberStore General group
    // GroupMemberStore.removeListener('GENERAL', this.onClick);
  }

  // getMembersOnClick() {
  //   const displayNewGroup = GroupMemberStore.allGroupMembers(
  //     this.state.newGroup);
  //   this.setState({
  //     general: displayNewGroup
  //   });
  // }

  userGroups() {
    const userGroups = GroupStore.allGroups(this.state.user);
    const genMembers = GroupMemberStore.allGeneralMembers(this.state.user);
    this.setState({
      groups: userGroups,
      general: genMembers
    });
  }

  // /**
  //   *onChange event
  //   * @param {string} e The first input
  //   * @return {void} updated state of user
  //   */
  // onChange(e) {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  //   // console.log(e.target.value);
  // }

  getMembersOnClick() {
    // const m = this.onChange();
    this.setState({
      newGroup: {
        email: this.state.user.email,
        password: this.state.user.password
        // group: m
      }
    });
    console.log(this.state.newGroup);
  }
  /**
    * @override
  */
  render() {
    return (
      <div>
        <div className="col-md-3">
          <div className="row chats-row">
            <div className="col-md-12">
              <ul className="col-md-10 col-md-offset-1 nav nav-pills
                nav-stacked grouplist">
                <li>general</li>
                {
                  (Object.keys(this.state.groups)).map((group, i) =>
                    <li key={i}
                      value={group} name={group}
                      onClick={this.getMembersOnClick}><Link to="#">
                        {group}</Link>
                    </li>
                  )}
              </ul>
            </div>
          </div>
        </div>
        <ChatBox name={this.state.groupname}/>
        <GroupMembers memberlist={this.state.general}/>
      </div>
    );
  }
}
