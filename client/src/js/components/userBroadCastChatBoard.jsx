import React from 'react';
import '../../css/icon.css';
import { sendMessage } from '../actions/appActions.js';
import { getGroups } from '../actions/groupAction.js';
import GroupStore from '../stores/groupStore.js';

/**
  * Represents BroadCastChatBoard Component.
*/
class BroadCastChatBoard extends React.Component {
  /**
    * @param {string} props inbuilt props.
  */
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem('user'));
    const groups = GroupStore.allGroups(user);
    this.state = {
      groups,
      user,
      message: '',
      currentGroup: 'general',
      chatMessages: [],
      groupUsers: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.groups = this.groups.bind(this);
  }

  componentWillMount() {
    getGroups(this.state.user);
    // call action that gets the group that a user belongs to
    // call action that gets the chat belonginf to that group
    // call action that get all the user that belongs to that group
  }

  componentDidMount() {
    GroupStore.on('getGroups', this.groups);
    // add event listener for the 3 actions
  }

  componentWillUnmount() {
    GroupStore.removeListener('getGroups', this.groups);
  }

  groups() {
    const group = GroupStore.allGroups(this.state.user);
    this.setState({
      groups: group
    });
  }

  /**
    * onChange event.
    * @param {object} message The first number.
    * @returns {void} bind input values to name.
  */
  onChange(message) {
    this.setState({
      [message.target.name]: message.target.value
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
    sendMessage(broadcastmessage)
      .then(() => {
        // alert('message sent');
      });
  }

  /**
    * @override
  */
  render() {
    // const userGroups = Object.keys(this.state.groups);
    return (
      <div>
      </div>
    );
  }
}

export default BroadCastChatBoard;
