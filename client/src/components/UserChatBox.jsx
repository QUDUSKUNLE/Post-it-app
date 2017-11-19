import React from 'react';
import toastr from 'toastr';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import UserAddMember from './UserAddMember';
import { sendGroupMessage } from '../actions/messageAction';
import ToggleButton from './ToggleButton';

/**
 * @description - renders ChatBox Component
 * @class ChatBox
 * @extends {React.Component}
 */
export default class UserChatBox extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {*} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      userId: JSON.parse(localStorage.getItem('Id')),
      username: JSON.parse(localStorage.getItem('userName')),
      message: '',
      priority: 'normal',
      show: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description - onChange event
   * @param {event} event - event
   * @returns {void} void
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description - onSubmit event
   * @param {event} event -
   * @returns {*} null
   * @memberOf ChatBox
   */
  onSubmit(event) {
    event.preventDefault();
    const newMessage = {
      groupId: this.props.groupId,
      message: this.state.message,
      priority: this.state.priority,
    };
    sendGroupMessage(newMessage);
    toastr.success('Message sent');
    this.setState({ message: '' });
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {*} ChatBox component
   * @ChatBox
   */
  render() {
    const priorityColor = (priority) => {
      let color;
      if (priority === 'normal') {
        color = <span className="pull-right text-primary">{priority}</span>;
      } else if (priority === 'critical') {
        color = <span className="pull-right text-danger">{priority}</span>;
      } else if (priority === 'urgent') {
        color = <span className="pull-right text-info">{priority}</span>;
      }
      return color;
    };
    const close = () => this.setState({ show: false });
    return (
      <div className="main">
        <ReactTooltip place="bottom" />
        <div className="col-md-10 col-md-offset-1">
          <ToggleButton />
          <h6>Group | {this.props.defaultGroup}
            <span
              type="button"
              data-tip={`Add Member to ${this.props.defaultGroup}`}
              className="glyphicon glyphicon-plus pull-right"
              onClick={() => this.setState({ show: true })}
            >
            </span>
          </h6>
          <div className="messageBoard">
            {this.props.allGeneralMessage.length === 0 ?
              <h5 className="center-align">
                No message Found
              </h5>
            : this.props.allGeneralMessage.map((Index, key) =>
              <div className="row" key={key}>
                <div className="col-md-12">
                  <div className="well">
                    <p>{Index.message}</p>
                    <small className="text-muted">
                      {Index.date} {Index.time} | {Index.userName}
                      {priorityColor(Index.priority)}
                      <br />
                    </small>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="row messageForm">
            <form className="col-md-12">
              <div className="input-group">
                <div className="input-group-addon">
                  <select name="priority" onChange={this.onChange}>
                    <option value="normal">Normal</option>
                    <option value="critical">Critical</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <input
                  type="text"
                  className="form-control message"
                  placeholder="Type message....."
                  name="message"
                  value={this.state.message}
                  onChange={this.onChange}
                />
                <div className="input-group-addon">
                  <button
                    className="btn btn-default"
                    onClick={this.onSubmit}
                  >Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <UserAddMember
          modalState={this.state.show}
          closeModal={close}
          selectedGroup={this.props.defaultGroup}
          groupId={this.props.groupId}
        />
      </div>
    );
  }
}

// props validation
UserChatBox.propTypes = {
  name: PropTypes.string,
  allGeneralMessage: PropTypes.array,
  defaultGroup: PropTypes.string,
  groupId: PropTypes.string
};
