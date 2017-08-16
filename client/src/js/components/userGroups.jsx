import React from 'react';
import { getGroups } from '../actions/groupAction.js';
import GroupStore from '../stores/groupStore.js';


export default class Groups extends React.Component {
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
      groupname: '',
      groupUsers: []
    };
    // this.onChange = this.onChange.bind(this);

    this.group = this.group.bind(this);
  }

  componentWillMount() {
    getGroups(this.state.user);
    // call action that gets the group that a user belongs to
    // call action that gets the chat belonginf to that group
    // call action that get all the user that belongs to that group
  }

  componentDidMount() {
    GroupStore.on('getGroups', this.group);
    // add event listener for the 3 actions
  }

  componentWillUnmount() {
    GroupStore.removeListener('getGroups', this.group);
  }

  group() {
    const group = GroupStore.allGroups(this.state.user);
    this.setState({
      groups: group
    });
  }

  // /**
  //   * onChange event.
  //   * @param {object} message The first number.
  //   * @returns {void} bind input values to name.
  // */
  // onChange(message) {
  //   this.setState({
  //     [message.target.name]: message.target.value
  //   });
  // }
  //
  // /**
  //   * onSubmit event.
  //   * @param {object} e .
  //   * @returns {void} .
  // onSubmit(e) {
  //   e.preventDefault();
  //   const broadcastmessage = {
  //     message: this.state.message
  //   };
  //   // sendMessage(broadcastmessage)
  //   //   .then(() => {
  //   //     // alert('message sent');
  //   //   });

  /**
    * @override
  */
  render() {
    // const userGroups = Object.keys(this.state.groups);
    // console.log(this.state.groups);
    return (
      <div className="col-md-3">
        <div className="row chats-row">
          <div className="col-md-12">
            <ul className="col-md-10 col-md-offset-1 nav nav-pills
              nav-stacked grouplist">
              <li><a href="#">General</a></li>
              {
                (Object.keys(this.state.groups)).map((group, i) =>
                  <li key={i}><a href="#">
                    {group}</a></li>)
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
