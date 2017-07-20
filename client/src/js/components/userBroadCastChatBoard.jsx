import React from 'react';
import '../../css/icon.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';

/**
  * Represents BroadCastChatBoard Component.
*/
class BroadCastChatBoard extends React.Component {
  /**
    * @param {string} props inbuilt props.
  */
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
		// Bind signOut tab to onClick event
    // this.onClick = this.onClick.bind(this);
  }

  /**
    * onChange event.
    * @param {object} message The first number.
    * @returns {void} bind input values to name.
  */
  onChange(message) {
    this.setState({
      [message.target.name]: message.target.value
    });
  }

	/**
    * onSubmit event.
    * @param {object} message .
    * @returns {void} .
  */
  onSubmit(message) {
    message.preventDefault();
    const broadcastmessage = {
      message: this.state.message
    };
    axios.post('/groupName/message', broadcastmessage).then(() => {
      alert('message sent');
    });
  }

  /**
    * @override
  */
  render() {
    return (
      <div>
        <div id='broadcastchat'>
          <div className='col-md-2'>
            <div className='group'>
              <div className="groupHeader">
                  <h5>Group</h5>
              </div>
              <div id="groupDisplay"></div>
            </div>
          </div>
          <div className='col-md-8'>
            <div className='chat'>
              <div className='groupHeader'>
                <h5>Abuja</h5>
              </div>
              <div id="chat"></div>
            </div>
            <div className="chatBottom">
              <div className='col-md-12'>
                <input type="text" onSubmit={this.onSubmit}
                  onChange={this.onChange} type="text"
                  className=""
                  value={this.state.message} name="message"
                  placeholder="Type your message..." />
                  <button id="sendMessageBut"
                    type="button" className="">Send
                  </button>
              </div>
            </div>
          </div>
          <div className='col-md-2'>
            <div className='member'>
              <div className="memberHeader">
                  <h5>Member</h5>
              </div>
              <div id="memberDisplay"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BroadCastChatBoard;
