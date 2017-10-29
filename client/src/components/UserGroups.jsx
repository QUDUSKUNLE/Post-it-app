import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description - renders Groups Component
 * @class Groups
 * @extends {React.Component}
 */
export default class UserGroups extends React.Component {
  /**
   * @description - render method, React lifecycle method
   * @returns {*} UserGroups Component
   */
  render() {
    const members = this.props.member.map(member => (
      <li key={Object.keys(member)}>
        <a href="#">{Object.values(member)}</a>
      </li>));
    return (
    <div id="sidebar" className="sidebar-offcanvas">
      <div className="col-md-12 groups">
        <ul className="nav nav-pills nav-stacked">
          {this.props.grouplist}
        </ul>
      </div>
      <div className="col-md-12 members">
        <div className="dropdown">
          <button
            className="btn btn-default dropdown-toggle"
            data-toggle="dropdown">Group Members
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            {members}
          </ul>
        </div>
      </div>
    </div>
    );
  }
}

// props validation
UserGroups.propTypes = {
  grouplist: PropTypes.array,
  generalMessageLength: PropTypes.number,
  defaultGroup: PropTypes.string,
  member: PropTypes.array
};
