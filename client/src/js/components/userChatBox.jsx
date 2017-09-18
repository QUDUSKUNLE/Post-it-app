import React from 'react';
import PropTypes from 'prop-types';
import { sendGeneralMessage,
  sendGroupMessage } from '../actions/messageActions.js';
import MessageStore from '../stores/MessageStore.js';


/**
 * @description - renders ChatBox Component
 * @class ChatBox
 * @extends {React.Component}
 */
export default class ChatBox extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      store: this.props.allGeneralMessage
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description - onChange event
   * @param {e} e - event
   * @returns {null} null
   * @memberOf ChatBox
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * @description - onSubmit event
   * @param {e} e - event
   * @returns {null} null
   * @memberOf ChatBox
   */
  onSubmit(e) {
    e.preventDefault();
    if (this.props.defaultGroup === 'general') {
      const newMessage = {
        message: this.state.message
      };
      sendGeneralMessage(newMessage);
      this.setState({
        store: MessageStore.allGeneralMessage()
      });
    } else {
      const newMessage = {
        group: this.props.defaultGroup,
        message: this.state.message
      };
      sendGroupMessage(newMessage);
      this.setState({
        store: MessageStore.allGroupMessage()
      });
    }
    this.setState({
      message: ''
    });
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {Object} ChatBox component
   * @ChatBox
   */
  render() {
    console.log(this.props.allGeneralMessage);
    const chatMessage = this.props.allGeneralMessage.map((Index, i) =>
      <li key={i} className="media">
        <div className="media-body">
          <div className="media">
            <div className="media-body">
              {Index.message}
              <br/>
              <small className="text-muted">
                {Index.date} | {Index.time}
              </small>
              <hr/>
            </div>
          </div>
        </div>
      </li>
    );
    return (
      <div className="col-md-9 current-chat">
        <div className="row" style={{ backgroundColor: '#e8e8ee' }}>
          <p className="text-center"
            style={{ padding: '5px', marginTops: '5px' }}>
            {this.props.defaultGroup}</p>
        </div>
        <div className="row current-chat-area">
          <div className="col-md-12">
            <ul className="media-list">
              {chatMessage}
            </ul>
          </div>
        </div>
        <div className="row current-chat-footer">
        <div className="panel-footer">
            <div className="input-group">
              <input
                type="text"
                name="message"
                value={this.state.message}
                className="form-control"
                onChange={this.onChange}/>
              <span className="input-group-btn">
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={this.onSubmit}>Send
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// props validation
ChatBox.propTypes = {
  name: PropTypes.string,
  allGeneralMessage: PropTypes.array,
  defaultGroup: PropTypes.string
};
