import React from 'react';
// import { getMembers } from '../actions/memberActions.js';
// import MemberStore from '../stores/memberStore.js';

export default class GroupMembers extends React.Component {
  // /**
  //   * @param {string} props inbuilt props.
  // */
  // constructor(props) {
  //   super(props);
  //   const email = JSON.parse(localStorage.getItem('user')).email;
  //   const password = JSON.parse(localStorage.getItem('user').password);
  //   // const members = MemberStore.allMembers(user);
  //   this.state = {
  //     email,
  //     password,
  //     group: 'general',
  //     members: [],
  //     message: ''
  //   };
  //   this.members = this.members.bind(this);
  // }
  // componentWillMount() {
  //   getMembers(this.state.email, this.state.password, this.state.group);
  // }
  //
  // componentDidMount() {
  //   MemberStore.on('getMembers', this.members);
  // }
  //
  // componentWillUnmount() {
  //   MemberStore.removeListener('getMembers', this.members);
  // }
  //
  // members() {
  //   const member = MemberStore.allMembers(this.st);
  //   this.setState({
  //     members: member
  //   });
  // }

  /**
    * @override
  */
  render() {
    return (
      <div className="col-md-3">
        <div className="row chats-row">
          <div className="col-md-12">
            <ul className="col-md-10 col-md-offset-1 nav nav-pills
              nav-stacked grouplist">
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
