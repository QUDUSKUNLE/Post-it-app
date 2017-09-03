import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { generalUsers } from '../actions/memberActions.js';
import MemberStore from '../stores/MemberStore.js';


export default class Groups extends React.Component {
  /**
    * @param {string} props inbuilt props.
  */
  constructor(props) {
    super(props);
    this.state = {
      group: []
    };
    // this.getMembersOnClick = this.getMembersOnClick.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  //
  componentDidMount() {
    MemberStore.on('GET_MEMBERS_OF_A_GROUP', this.handleOnClick);
    // add event listener for the 3 actions
  }

  componentWillUnmount() {
    MemberStore.removeListener('GET_MEMBERS_OF_A_GROUP',
      this.handleOnClick);
  }

  handleOnClick() {
    const clickedGroup = MemberStore.allGroupMembers();
    this.props.getMembers(clickedGroup);
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
                <li key="general"
                  value="general" name="general"
                  onClick={() => generalUsers()}>
                  <Link to="#">general</Link></li>
                {this.props.grouplist}
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
  grouplist: PropTypes.array,
  defaultGroup: PropTypes.string,
  getMembers: PropTypes.func.isRequired
};
