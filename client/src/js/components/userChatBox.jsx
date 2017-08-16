import React from 'react';

export default class ChatBox extends React.Component {
  render() {
    return (
      <div className="col-md-6 current-chat">
        <div className="row" style={{ backgroundColor: '#e8e8ee' }}>
          <p className="text-center">Chatbox</p>
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
              <input type="text" className="form-control" />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">Send
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
