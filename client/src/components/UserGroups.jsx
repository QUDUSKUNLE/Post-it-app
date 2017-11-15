import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description - renders Groups Component
 * @function Groups
 * @param {object} props
 * @return {object} UserGroups component
 */
const UserGroups = (props) => {
  const members = props.member.map(member => (
    <li key={Object.keys(member)}>
      <a href="#">{Object.values(member)}</a>
    </li>));
  return (
    <div id="sidebar" className="sidebar-offcanvas">
      <div className="col-md-12 groups">
        <div className="groupName">
          <center>
            Your Groups
          </center>
        </div>
        <br />
        <ul className="nav nav-pills nav-stacked">
          {props.grouplist}
        </ul>
      </div>
      <div className="col-md-12 members">
        {props.groupSelected ?
          <div className="dropdown">
            <button
              className="btn btn-default dropdown-toggle"
              data-toggle="dropdown"
            >Group Members
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu scrollable-menu">
              {members}
            </ul>
          </div> : <span></span>
        }
      </div>
    </div>
  );
};

// props validation
UserGroups.propTypes = {
  grouplist: PropTypes.array,
  generalMessageLength: PropTypes.number,
  defaultGroup: PropTypes.string,
  member: PropTypes.array,
  groupSelected: PropTypes.bool
};

export default UserGroups;
