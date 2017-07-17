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
        <div className="col-md-2">
          <h6 className='text-center'>Member</h6>
          <hr/>
          <div id="user-list">
            <ul className="nav grouplist">
              <li className='text-center'>Andela Lagos</li>
              <li className='text-center'>Andela Lagos</li>
              <li className='text-center'>Andela Lagos</li>
              <li className='text-center'>Andela Lagos</li>
              <li className='text-center'>Andela Lagos</li>
              <li className='text-center'>Andela Lagos</li>
              <li className='text-center'>Andela Lagos</li>
              <li className='text-center'>Andela Lagos</li>
              <li className='text-center'>Andela Lagos</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default BroadCastMemberList;
