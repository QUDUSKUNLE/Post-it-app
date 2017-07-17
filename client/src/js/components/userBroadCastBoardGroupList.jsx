import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/icon.css';

/**
  * Represents BroadCastGroupList Component.
*/
class BroadCastGroupList extends React.Component {
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
          <div className="col-md-2 broadcastbody">
            <h6 className='text-center'>Group</h6>
            <hr/>
            <div id="user-list">
              <ul className="nav">
                <li className='text-center'>
                  <Link to="/broadcastboard">Andela Lagos</Link></li>
                <li className='text-center'>
                  <Link to="/broadcastboard">Andela Abuja</Link></li>
                <li className='text-center'>
                  <Link to="/broadcastboard">Andela Calabar</Link></li>
                <li className='text-center'>
                  <Link to="/broadcastboard">Andela Calabar</Link></li>
                <li className='text-center'>
                  <Link to="/broadcastboard">Andela Kisi</Link></li>
                <li className='text-center'>
                  <Link to="/broadcastboard">Andela Lagos</Link></li>
                <li className='text-center'>
                  <Link to="/broadcastboard">Andela Abuja</Link></li>
                <li className='text-center'>
                  <Link to="/broadcastboard">Andela Calabar</Link></li>
                <li className='text-center'>
                  <Link to="/broadcastboard">Andela Calabar</Link></li>
                <li className='text-center'>
                  <Link to="/broadcastboard">Andela Kisi</Link></li>
              </ul>
            </div>
          </div>
      </div>
    );
  }
}

export default BroadCastGroupList;
