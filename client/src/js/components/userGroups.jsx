import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getGroupMembers, generalUsers } from '../actions/memberActions.js';
import MemberStore from '../stores/MemberStore.js';


export default class Groups extends React.Component {
  /**
    * @param {string} props inbuilt props.
  */
  constructor(props) {
    super(props);
    this.state = {
      group: ''
    };
    this.getMembersOnClick = this.getMembersOnClick.bind(this);
  }
  //
  componentDidMount() {
    MemberStore.on('GET_MEMBERS_OF_A_GROUP', this.getMembersOnClick);
    // add event listener for the 3 actions
  }

  componentWillUnmount() {
    MemberStore.removeListener('GET_MEMBERS_OF_A_GROUP',
      this.getMembersOnClick);
  }

  getMembersOnClick() {
    this.setState({
      group: MemberStore.allGroupMembers()
    }, () => {
      console.log(this.state.group);
    });
  }

  /**
    * @override
  */
  render() {
    const groupList = this.props.grouplist.map((group, i) =>
      <li key={i}
        value={group} name={group}
        onClick={() => getGroupMembers({ group })}><Link to="#">
          {group}</Link>
      </li>, this);
    return (
      <div>
        <div className="col-md-3">
          <div className="row chats-row">
            <div className="col-md-12">
              <ul className="col-md-10 col-md-offset-1 nav nav-pills
                nav-stacked grouplist">
                <li key="general"
                  value="general" name="general"
                  onClick={() => generalUsers()}>
                  <Link to="#">general</Link></li>
                {groupList}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// props validation
Groups.propTypes = {
  grouplist: PropTypes.array
};
