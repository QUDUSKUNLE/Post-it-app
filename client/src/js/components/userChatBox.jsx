import React from 'react';
import PropTypes from 'prop-types';
import { sendGroupMessage } from '../actions/messageActions.js';
export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: '',
      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      name: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({
      newMessage: this.state.message
    });
    sendGroupMessage();
    //   .then(({ data }) => {
    //
    //   })
  }
  render() {
    return (
      <div className="col-md-9 current-chat">
        <div className="row" style={{ backgroundColor: '#e8e8ee' }}>
          <p className="text-center">{'general'}</p>
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
  name: PropTypes.string
};
