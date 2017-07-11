import React from 'react';
import '../../css/icon.css';
// import { Link } from 'react-router-dom';

/**
  * Represents BroadCastMemberList Component.
*/
class BroadCastMemberList extends React.Component {
  /**
    * @override
  */
  render() {
    return (
      <div>
        <div className="col-md-3"
          style={{ backgroundColor: '#756d6d' }}>
          <h5 className="text-center para">Group member</h5>
          <hr />
          <br />
          <div className="row">
            <div className="col-md-12 col-xs-12 col-lg-12 broadcastbody">
              <div>
                <ul>
                  <li>ebuka</li>
                  <li>quduskunle</li>
                  <li>osayamen</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BroadCastMemberList;
