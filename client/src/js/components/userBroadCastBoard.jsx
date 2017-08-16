import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import BroadCastNav from './userBroadCastBoardNav.jsx';
// import BroadCastChatBoard from './userBroadCastChatBoard.jsx';
import Groups from './userGroups.jsx';
import ChatBox from './userChatBox.jsx';
import GroupMembers from './userGroupMembers.jsx';
// import Footer from './footer.jsx';
import { signoutAction, sendMessage } from
  '../actions/appActions.js';
import '../../css/icon.css';

const loggedIn = (localStorage.getItem('user')) !== false;
/**
  * Represents BroadCastBoard Component.
*/
export default class BroadCastBoard extends React.Component {
  /**
    * @param {string} props inbuilt props.
  */
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      signOutMessage: '',
      errSignOut: '',
      broadcastmessage: '',
      loggedIn
    };
    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.onClick = this.onClick.bind(this); // Bind signOut tab to onClick event
  }

  /**
    * onChange event.
    * @param {object} e The first number.
    * @returns {void} bind input values to name.
 */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
    * onSubmit event.
    * @param {object} e .
    * @returns {void} .
  */
  onSubmit(e) {
    e.preventDefault();
    const broadcastmessage = {
      message: this.state.message
    };
    sendMessage(broadcastmessage).then((res) => {
      this.setState({
        message: res.data.message
      });
    });
  }
  /**
    * onClick event.
    * @param {void} nill no parameter.
    * @returns {object} response from server.
  */
  onClick() {
    signoutAction().then((resp) => {
      this.setState({
        signupMessage: resp.data.message
      });
      localStorage.removeItem('user');
      setTimeout(() => {
        this.props.history.push('/');
      }, 1000);
    }).catch((error) => {
      if (error.response) {
        this.setState({
          errSignOut: error.response.data
        });
      }
    });
  }
  /**
    * @override
  */
  render() {
    // const { loggedIn } = this.state;
    if (!loggedIn) {
      return (
        <Redirect to="/signin" />
      );
    }
    return (
      <div>
        <nav className="navbar navbar-inverse navabar-fixed-top"
          role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle"
                data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="#">
                PostIt<small>App</small>
              </Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav"></ul>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="#">Home</Link></li><li className="active">
                  <Link to="/broadcastboard">ChatRoom</Link></li>
                <li onClick={this.onClick}><Link to="#">Sign out</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <span>{this.state.errSignOut}</span>
          <p className="pull-right">Hi, welcome to PostIt</p>
          <BroadCastNav />
          <br/>
          <div className="row">
            <Groups/>
            <ChatBox/>
            <GroupMembers/>
          </div>
        </div>
      </div>
    );
  }
}

BroadCastBoard.propTypes = {
  history: PropTypes.function
};
