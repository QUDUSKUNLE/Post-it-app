import React from 'react';
import PropTypes from 'prop-types';
import { sendGroupMessage } from '../actions/messageActions.js';
import MessageStore from '../stores/MessageStore.js';


export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentDidMount() {
  //   MessageStore.on('SEND_MESSAGE', this.onSubmit);
  // }

  // componentWillUnmount() {
  //   MessageStore.removeListener('SEND_MESSAGE', this.onSubmit);
  // }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newMessage = {
      group: this.props.defaultGroup,
      message: this.state.message
    };
    console.log(newMessage);
    sendGroupMessage(newMessage);
    const mess = MessageStore.sendMessage();
    console.log(mess);
  }

  render() {
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
              <li className="media">
                <div className="media-body">
                  <div className="media">
                    <div className="media-body">
                      Donec sit amet ligula enim. Duis vel
                      condimentum massa. Donec sit amet ligula enim.
                      Duis vel condimentum massa.Donec sit amet ligula
                      enim. Duis vel condimentum massa. Donec sit amet
                      ligula enim. Duis vel condimentum massa.
                      <br/>
                      <small
                        className="text-muted">
                        Alex Deo | 23rd June at 5:00pm</small>
                      <hr/>
                    </div>
                  </div>
                </div>
              </li>
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

ChatBox.propTypes = {
  name: PropTypes.string,
  defaultGroup: PropTypes.string
};