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
        <div className="col-md-8">
          <h6 className='text-center'>Group: Andela Lagos</h6>
          <hr/>
          <div id="conversation">
          </div>
          <div className="row" id="sendMessageDetails">
            <div className="col-md-10">
              <input id="sendMessage" onSubmit={this.onSubmit}
                onChange={this.onChange}
                type="text" className="form-control"
                value={this.state.message} name="message"
                placeholder="Type your message..."/>
            </div>
            <div className="col-md-2">
              <button id="sendMessageBut"
                type="button" className="btn btn-primary">Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BroadCastChatBoard;
