import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/icon.css';

/**
 * Represents BroadCastGroupList Component.
 */
class BroadCastGroupList extends React.Component {
  // BroadCastGroupList constructor
  /**
     * @param {string} props inbuilt props.
     */
  // constructor(props) {
  //   super(props);
  //   this.onChange = this.onChange.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);
	// 	// Bind signOut tab to onClick event
  //   this.onClick = this.onClick.bind(this);
  // }

  /**
	* Server query event.
	* @returns {object} .
	*/
  getGroupList() {
    axios.get('/groupList').then((response) => {
      console.log(response.data.message);
    });
  }
  /**
     * @override
     */
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12 col-xs-12 col-lg-12 broadcastbody">
            <ul className="nav grouplist">
              <li><Link to="/broadcastboard">Andela Lagos</Link></li>
              <li><Link to="/broadcastboard">Andela Abuja</Link></li>
              <li><Link to="/broadcastboard">Andela Calabar</Link></li>
              <li><Link to="/broadcastboard">Andela Calabar</Link></li>
              <li><Link to="/broadcastboard">Andela Kisi</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default BroadCastGroupList;
