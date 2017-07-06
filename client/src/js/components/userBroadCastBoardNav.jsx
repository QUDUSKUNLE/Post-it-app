import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/icon.css';

/**
 * Represents BroadCastNav Component.
 */
class BroadCastNav extends React.Component {
  /**
     * @override
     */
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills nav-justified">
                <li role="presentation" className="active">
                  <Link to="/broadcastboard">BroadcastBoard</Link>
                </li>
                <li role="presentation" data-toggle="modal"
                  data-target="#myModal"><Link to="/group">Create Group</Link>
                </li>
                <li role="presentation"><Link to="/member">
                Add member</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BroadCastNav;
