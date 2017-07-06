import React from 'react';
import '../../css/icon.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';

/**
 * Represents BroadCastChatBoard Component.
 */
class BroadCastChatBoard extends React.Component {
  // BroadCastBoard constructor
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
        <div className="col-md-6"
          style={{ backgroundColor: '#2d2d2d' }}>
          <h5 className="text-center para">Group: Andela Abuja</h5>
          <hr />
          <br />
          <div className="row">
            <div className="col-md-12 col-xs-12 col-lg-12 broadcastbody">
              <form id="broadcastform" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <textarea type="text" name="message"
                    onChange={this.onChange} placeholder="write message"
                    className="form-control" value={this.state.message}>
                  </textarea>
                </div>
                <button type="submit"
                  className="btn btn-primary pull-right">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BroadCastChatBoard;
