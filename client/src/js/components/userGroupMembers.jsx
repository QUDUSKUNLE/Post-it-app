import React from 'react';
import PropTypes from 'prop-types';

export default class GroupMembers extends React.Component {
  /**
    * @override
  */
  render() {
    const memberlists = (this.props.memberlist);
    return (
      <div className="col-md-3">
        <div className="row chats-row">
          <div className="col-md-12">
            <ul className="col-md-10 col-md-offset-1 nav nav-pills
              nav-stacked grouplist">
              {
                memberlists.map((member, i) =>
                  <li key={i}>{member}</li>)
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

// props validation
GroupMembers.propTypes = {
  memberlist: PropTypes.array
};
